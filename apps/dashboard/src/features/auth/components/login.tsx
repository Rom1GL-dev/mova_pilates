import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '@/features/auth/usecases/login/login.ts';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
  LoginFormFields,
  LoginFormInputs
} from '@/features/auth/components/login-form-fields.tsx';

export function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError(null);
    setLoading(true);
    try {
      const loginUser = await login(data);
      if (loginUser) {
        navigate(APP_ROUTES.app.getHref());
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f3e8de]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          MOVA Pilates
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">Administration</p>

        {loginError && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600">
            {loginError}
          </div>
        )}

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
      </div>
    </div>
  );
}
