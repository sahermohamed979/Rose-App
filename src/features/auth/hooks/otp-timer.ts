import { useCallback, useEffect, useState } from 'react';

const OTP_DURATION = 60;
const STORAGE_KEY = 'otp_end_time';

function readTimeLeft(duration: number): number {
  if (typeof window === 'undefined') {
    return duration;
  }

  const savedEndTime = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (savedEndTime) {
    const remaining = Math.round((Number(savedEndTime) - now) / 1000);
    return remaining > 0 ? remaining : 0;
  }

  const endTime = now + duration * 1000;
  localStorage.setItem(STORAGE_KEY, endTime.toString());
  return duration;
}

export function useOtpTimer(duration = OTP_DURATION) {
  const [timeLeft, setTimeLeft] = useState(() =>
    readTimeLeft(duration)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetTimer = useCallback(() => {
    const endTime = Date.now() + duration * 1000;
    localStorage.setItem(STORAGE_KEY, endTime.toString());
    setTimeLeft(duration);
  }, [duration]);

  return { timeLeft, resetTimer, canResend: timeLeft <= 0 };
}
