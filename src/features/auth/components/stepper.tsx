'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

interface StepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const Stepper = ({
  currentStep,
  onStepChange,
}: StepperProps) => {
  // number of steps
  const steps = [1, 2, 3, 4];
  // circle style
  const getStepStyle = (step: number) => {
    if (step < currentStep) {
      return 'bg-bg-primary text-text-inverse';
    }
    if (step === currentStep) {
      return 'bg-bg-primary shadow ring-2 ring-ring-default text-text-inverse';
    }
    return 'bg-bg-primary-fade text-text-primary';
  };
  // line style
  const getLineStyle = (step: number) => {
    return step < currentStep
      ? 'bg-bg-primary'
      : 'bg-bg-primary-fade';
  };
  // translation
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between w-full mt-3 mb-3">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* number circle */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors duration-300 ${getStepStyle(step)}`}
            onClick={() => onStepChange(step)}
          >
            {t(`register.step${step}`)}
          </div>

          {/* line between */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-[.5px] ${getLineStyle(step)}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
