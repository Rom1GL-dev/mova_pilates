import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { OtpField } from '@/features/auth/components/otp-field.tsx';

interface Props {
  onSubmit: (data: { otp: string }) => void;
  onBack: () => void;
  loading: boolean;
}

export function OtpStepForm({ onSubmit, onBack, loading }: Props) {
  const { control, handleSubmit, watch, trigger, getValues } = useForm<{
    otp: string;
  }>({
    defaultValues: { otp: '' }
  });

  const otp = watch('otp');

  useEffect(() => {
    if (otp && otp.length === 6) {
      (async () => {
        const valid = await trigger('otp');
        if (valid) {
          onSubmit({ otp: getValues('otp') });
        }
      })();
    }
  }, [otp, trigger, getValues, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <OtpField control={control} name="otp" />

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Retour
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-lg bg-[#b28053] px-6 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-[#8b6f55] disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Vérification...
            </span>
          ) : (
            'Valider'
          )}
        </Button>
      </div>
    </form>
  );
}
