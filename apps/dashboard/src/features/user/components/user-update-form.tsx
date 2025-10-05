import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useUpdateUser } from '@/features/user/usecases/update-user/use-update-user.tsx';
import { useMe } from '@/lib/auth.tsx';
import { useToast } from '@/providers/toast-provider.tsx';
import { useForm } from 'react-hook-form';
import { TUser } from '@/features/user/types/TUser.ts';
import dayjs from 'dayjs';

interface Props {
  user: TUser;
}

export function UserUpdateForm({ user }: Props) {
  const updateUser = useUpdateUser();
  const me = useMe();
  const { showToast } = useToast();

  const form = useForm<TUser>({
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      tel: user.tel,
      email: user.email,
      role: user.role,
      dob: dayjs(user.dob).format('YYYY-MM-DD')
    }
  });

  const onSubmit = async (data: TUser) => {
    const response = await updateUser.mutateAsync({
      ...data,
      dob: new Date(data.dob)
    });
    if (response) {
      showToast({
        type: 'success',
        message: 'Utilisateur modifié avec succès'
      });
    } else {
      showToast({
        type: 'error',
        message:
          "Une erreur s'est produite lors de la modification de l'utilisateur"
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-md"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Prénom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de famille</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="06 XX XX XX XX" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => {
              const fallback = dayjs(user.dob).format('YYYY-MM-DD');
              return (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ?? fallback}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    disabled={user.email === me.email}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Utilisateur</SelectItem>
                      <SelectItem value="ADMIN">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {user.email === me.email && (
                  <FormDescription>
                    Vous ne pouvez pas modifié votre propre rôle.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-6 cursor-pointer bg-[#b28053] text-white hover:bg-[#8b6f55]"
          >
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
}
