import { Control, useController } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

interface OtpFieldProps {
  control: Control<any>;
  name: string;
}

export function OtpField({ control, name }: OtpFieldProps) {
  const {
    field: { value, onChange }
  } = useController({
    name,
    control,
    defaultValue: ''
  });

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Code de vérification
      </label>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={onChange}
        className="flex justify-center"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSeparator />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
