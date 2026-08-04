interface StepperProps {
  currentStep: number;
}

// This can be turned into a reusable component by receiving the currentStep as a prop same as colors in case of need
export default function CheckoutStepper({
  currentStep,
}: StepperProps) {
  const activeColor = 'bg-bg-primary-saturated';
  const inactiveBg = 'bg-bg-soft';
  const inactiveText = 'text-text-soft';

  return (
    <div className="flex items-center w-full">
      {/* Line before step 1 */}
      <div
        className={`h-2 flex-1 rounded-s-full -mr-1 ${activeColor}`}
      />

      {/* Step 1 circle */}
      <div
        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${activeColor}`}
      >
        1
      </div>

      {/* Line between step 1 and 2 */}
      <div
        className={`h-2 flex-1 -mx-1 ${currentStep >= 2 ? activeColor : inactiveBg}`}
      />

      {/* Step 2 circle */}
      <div
        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
          currentStep >= 2
            ? `${activeColor} text-white`
            : `${inactiveBg} ${inactiveText}`
        }`}
      >
        2
      </div>

      {/* Line after step 2 */}
      <div
        className={`h-2 flex-1 rounded-e-full -ml-1 ${inactiveBg}`}
      />
    </div>
  );
}
