import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useTranslations } from 'next-intl';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RegisterSchemaType } from '../types/register-types';

interface emailInputProps {
  currentStep: number;
  onEmailChange: (email: string) => void;
  register: UseFormRegister<RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
}
export default function EmailInputStep({
  currentStep,
  onEmailChange,
  register,
  errors,
}: emailInputProps) {
  // translations
  const t = useTranslations('register');

  return (
    <div>
      {currentStep === 1 && (
        <div className="gap-y-1.5 flex flex-col">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            placeholder={t('email')}
            {...register('email', {
              onChange: (e) => onEmailChange(e.target.value),
            })}
          />
          {errors.email && (
            <p className="text-text-danger">{errors.email.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
