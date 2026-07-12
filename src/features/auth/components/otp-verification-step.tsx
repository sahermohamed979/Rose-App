import { Button } from '@/shared/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import { useTranslations } from 'next-intl';

interface OtpProps {
  currentStep: number;
  setStep: (step: number) => void;
  otp: string;
  setOtp: (otp: string) => void;
  otpError: string;
  handleResend: () => void;
  canResend: boolean;
  timeLeft: number;
}
export default function OtpVerificationStep({
  currentStep,
  otp,
  setOtp,
  otpError,
  handleResend,
  canResend,
  timeLeft,
}: OtpProps) {
  // hooks &transilations
  const t = useTranslations('register');

  return (
    <div>
      {currentStep === 2 && (
        <>
          <div className="gap-y-1.5 flex flex-col items-center rtl:direction-ltr">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            {otpError && (
              <p className="text-text-danger text-start">
                {otpError}
              </p>
            )}
            {/* otp resend OTP logic */}
            {!canResend ? (
              <p className=" flex justify-end text-sm text-text-muted mt-2">
                {t('otp.resendTimer', { s: timeLeft })}
              </p>
            ) : (
              <Button
                type="button"
                variant={'link'}
                className="flex p-0 ms-auto text-sm text-text-plain leading-none mt-7"
                onClick={handleResend}
              >
                {t('otp.resend')}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
