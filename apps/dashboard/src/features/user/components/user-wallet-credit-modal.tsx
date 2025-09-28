'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TWallet } from '@/features/user/types/TWallet';
import { Minus, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useUpdateWallet } from '@/features/user/usecases/update-wallet/use-update-wallet';
import { TUser } from '@/features/user/types/TUser.ts';
import { useToast } from '@/providers/toast-provider';

interface Props {
  wallet: TWallet;
  user: TUser;
}

export function UserWalletCreditModal({ wallet, user }: Props) {
  const [open, setOpen] = useState(false);
  const updateWallet = useUpdateWallet(user.id);
  const { showToast } = useToast();

  const form = useForm({
    defaultValues: {
      balance: wallet.balance ?? 0
    }
  });

  const onSubmit = async (data: { balance: number }) => {
    await updateWallet.mutateAsync({
      typeCourseId: wallet.typeCourseId,
      userId: user.id,
      balance: data.balance
    });
    showToast({
      type: 'success',
      message: `Crédit - ${wallet.label} ajusté avec succès`
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Gérer le crédit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 md:w-1/2">
        <DialogHeader>
          <DialogTitle>Ajuster le crédit – {wallet.label}</DialogTitle>
        </DialogHeader>

        {/* ✅ Formulaire react-hook-form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveau solde</FormLabel>
                  <div className="flex w-1/2 items-center">
                    <Button
                      type="button"
                      className="rounded-r-none bg-[#b28053] text-white hover:bg-[#8b6f55]"
                      onClick={() =>
                        form.setValue('balance', (field.value ?? 0) - 1)
                      }
                    >
                      <Minus />
                    </Button>
                    <FormControl>
                      <Input
                        type="number"
                        className="rounded-none text-center"
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      className="rounded-l-none bg-[#b28053] text-white hover:bg-[#8b6f55]"
                      onClick={() =>
                        form.setValue('balance', (field.value ?? 0) + 1)
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-[#b28053] text-white hover:bg-[#8b6f55]"
                disabled={updateWallet.isPending}
              >
                {updateWallet.isPending ? 'En cours...' : 'Valider'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
