import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormFieldsProps {
  control: Control<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
}

export function LoginFormFields({ control, errors }: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "L'email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format d'email invalide"
            }
          }}
          render={({ field }) => (
            <Input {...field} type="email" placeholder="admin@exemple.com" />
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <div className="relative">
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Le mot de passe est requis'
            }}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
              />
            )}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
    </>
  );
}
