'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react'; // تأكد إن دي متسطبة
import { PasswordInput } from '@/shared/components/ui/input-password';
import { SearchInput } from '@/shared/components/ui/input-search';
import { NumberInput } from '@/shared/components/ui/input-numbers';
import { FileInput } from '@/shared/components/ui/input-upload-file';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { Country } from 'react-phone-number-input';
import { Input } from '@/shared/components/ui/input';
import { PhoneInput } from '@/shared/components/ui/input-phone';

export default function InputsShowcase() {
  const [phone, setPhone] = React.useState<string | undefined>();

  // حالة الـ Theme
  const [isDark, setIsDark] = React.useState(false);

  // Effect عشان نحط أو نشيل كلاس الـ dark من الـ html
  React.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between border-b border-border/50 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Design System Showcase
            </h1>
            <p className="text-muted-foreground">
              A comprehensive overview of all custom input components
              and their states.
            </p>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* 1. Base Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              1. Base Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <Input placeholder="Type something..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <Input disabled placeholder="Disabled state" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <Input aria-invalid="true" placeholder="Error state" />
            </div>
          </section>

          {/* 2. Password Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              2. Password Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <PasswordInput placeholder="Enter your password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <PasswordInput
                disabled
                placeholder="Disabled password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <PasswordInput
                aria-invalid="true"
                placeholder="Invalid password"
              />
            </div>
          </section>

          {/* 3. Search Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              3. Search Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <SearchInput placeholder="Search items..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <SearchInput disabled placeholder="Search disabled" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <SearchInput
                aria-invalid="true"
                placeholder="Search invalid"
              />
            </div>
          </section>

          {/* 4. Number Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              4. Number Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <NumberInput placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <NumberInput disabled placeholder="0" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <NumberInput aria-invalid="true" placeholder="0" />
            </div>
          </section>

          {/* 5. Phone Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              5. Phone Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <PhoneInput disabled placeholder="Disabled phone" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <PhoneInput
                aria-invalid="true"
                placeholder="Invalid phone"
              />
            </div>
          </section>

          {/* 6. File Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              6. File Input
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <FileInput />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <FileInput disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <FileInput aria-invalid="true" />
            </div>
          </section>

          {/* 7. Select Component */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              7. Select Component
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled</label>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select disabled" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-destructive">
                Invalid (Error)
              </label>
              <Select>
                <SelectTrigger aria-invalid="true">
                  <SelectValue placeholder="Select invalid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* 8. OTP Input */}
          <section className="space-y-4 rounded-xl border border-border/50 p-6 shadow-sm bg-card transition-colors duration-300 xl:col-span-2">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">
              8. OTP Input
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default</label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Disabled
                </label>
                <InputOTP maxLength={6} disabled>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-destructive">
                  Invalid (Error)
                </label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup className="has-aria-invalid:border-destructive">
                    <InputOTPSlot index={0} aria-invalid="true" />
                    <InputOTPSlot index={1} aria-invalid="true" />
                    <InputOTPSlot index={2} aria-invalid="true" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="has-aria-invalid:border-destructive">
                    <InputOTPSlot index={3} aria-invalid="true" />
                    <InputOTPSlot index={4} aria-invalid="true" />
                    <InputOTPSlot index={5} aria-invalid="true" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
