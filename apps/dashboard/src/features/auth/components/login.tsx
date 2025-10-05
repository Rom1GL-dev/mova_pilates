import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '@/features/auth/usecases/login/login.ts';
import { verifyOtp } from '@/features/auth/usecases/verify-otp/verify-otp.ts';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { useMe } from '@/lib/auth.tsx';
import { LoginStepForm } from './login-step-form.tsx';
import { OtpStepForm } from './otp-step-form.tsx';

export function Login() {
  const navigate = useNavigate();
  const me = useMe();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [email, setEmail] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpMEssage, setOtpMessage] = useState<string | null>(null);

  useEffect(() => {
    if (me) {
      navigate(APP_ROUTES.app.getHref());
    }
  }, [me, navigate]);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoginError(null);
    setLoading(true);
    try {
      const loginUser = await login(data);
      if (loginUser?.email) {
        setEmail(loginUser.email);
        setOtpMessage(
          'Un code à 6 chiffres vous a été envoyé à votre adresse email.'
        );
        setStep('otp');
      }
    } catch (error: any) {
      setLoginError(
        error?.response?.data?.message ||
          error?.message ||
          'Une erreur est survenue. Veuillez réessayer plus tard.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async (data: { otp: string }) => {
    if (!email) return;
    setLoginError(null);
    setLoading(true);
    try {
      const verified = await verifyOtp({ email, otp: data.otp });
      if (verified) {
        window.location.href = APP_ROUTES.app.getHref();
      }
    } catch (error: any) {
      setLoginError(
        error?.response?.data?.message ||
          error?.message ||
          'Une erreur est survenue. Veuillez réessayer plus tard.'
      );
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

        {otpMEssage && (
          <div className="mb-4 rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-600">
            {otpMEssage}
          </div>
        )}

        {step === 'login' && (
          <LoginStepForm onSubmit={handleLogin} loading={loading} />
        )}

        {step === 'otp' && (
          <OtpStepForm
            onSubmit={handleOtp}
            loading={loading}
            onBack={() => setStep('login')}
          />
        )}
      </div>
    </div>
  );
}
