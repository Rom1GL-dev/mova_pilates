import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import {
  LoginFormFields,
  LoginFormInputs
} from '@/features/auth/components/login-form-fields.tsx';

interface Props {
  onSubmit: (data: LoginFormInputs) => void;
  loading: boolean;
}

export function LoginStepForm({ onSubmit, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <LoginFormFields control={control} errors={errors} />
      <Button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-lg bg-[#b28053] py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-[#8b6f55] disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Connexion...
          </span>
        ) : (
          'Se connecter'
        )}
      </Button>
    </form>
  );
}
