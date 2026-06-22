'use client';

import * as React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp'; // Update path if needed
import { Input } from '@/shared/components/ui/input';

export default function InputsShowcase() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-12">
      {/* 1. Standard Input Showcase */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Standard Inputs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Default</label>
            <Input placeholder="Type something..." />
          </div>

          {/* Read Only State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Read Only</label>
            <Input readOnly value="Read only value" />
          </div>

          {/* Disabled State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled</label>
            <Input disabled placeholder="Disabled input" />
          </div>

          {/* Error / Invalid State */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-destructive">
              Error (Invalid)
            </label>
            <Input
              aria-invalid="true"
              placeholder="Error state input"
            />
          </div>
        </div>
      </section>

      {/* 2. OTP Input Showcase */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          OTP Inputs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default State */}
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

          {/* Disabled State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled</label>
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

          {/* Error / Invalid State */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-destructive">
              Error (Invalid)
            </label>
            <InputOTP maxLength={6}>
              <InputOTPGroup className="has-aria-invalid:border-destructive">
                {/* Note: In a real form, you would pass aria-invalid to the slots 
                  or the group based on your validation logic.
                */}
                <InputOTPSlot index={0} aria-invalid="true" />
                <InputOTPSlot index={1} aria-invalid="true" />
                <InputOTPSlot index={2} aria-invalid="true" />
                <InputOTPSlot index={3} aria-invalid="true" />
                <InputOTPSlot index={4} aria-invalid="true" />
                <InputOTPSlot index={5} aria-invalid="true" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </section>
    </div>
  );
}
