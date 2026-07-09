import { useTranslations } from 'next-intl';

interface StepperProps {
  currentStep: number;
}

export const Stepper = ({ currentStep }: StepperProps) => {
  const getStepStyle = (step: number) => {
    // compeleted step
    if (step < currentStep) {
      return 'bg-bg-primary text-text-inverse ';
    }
    // current step
    if (step === currentStep) {
      return ' bg-bg-primary shadow ring-2 ring-ring-default text-text-inverse';
    }
    // coming step
    return ' bg-bg-primary-fade text-text-primary';
  };
  // line
  const getLineStyle = (step: number) => {
    return step < currentStep
      ? 'bg-bg-primary '
      : 'bg-bg-primary-fade';
  };
  const t = useTranslations();
  return (
    <div className="flex items-center justify-between w-full mt-3  mb-5">
      {/* الخطوة 1 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStepStyle(1)}`}
      >
        {t('register.step1')}
      </div>
      <div className={`flex-1 h-[.5px]  ${getLineStyle(1)}`} />

      {/* الخطوة 2 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStepStyle(2)}`}
      >
        {t('register.step2')}
      </div>
      <div className={`flex-1 h-[.5px]  ${getLineStyle(2)}`} />

      {/* الخطوة 3 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStepStyle(3)}`}
      >
        {t('register.step3')}
      </div>
      <div className={`flex-1 h-[.5px]  ${getLineStyle(3)}`} />

      {/* الخطوة 4 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStepStyle(4)}`}
      >
        {t('register.step4')}
      </div>
    </div>
  );
};
