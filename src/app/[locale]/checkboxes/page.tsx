'use client';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Checkbox } from '@/shared/components/ui/checkbox';
import React from 'react';
import { useState } from 'react';

export default function CheckboxesPage() {
  const [checked, setChecked] = useState(false);
  const [touched, setTouched] = useState(true);
  const hasError = touched && !checked;
  return (
    <main className="grow  flex items-center justify-center gap-y-5.5 flex-col">
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8 ">
        <h1> Checkboxes components</h1>
      </div>
      <div className=" flex mx-auto max-w-6xl px-4  sm:px-6 lg:px-8  gap-x-5">
        <FieldGroup className="mx-auto w-100">
          <Field orientation="horizontal">
            <Checkbox id="option1" name="option1" />
            <FieldLabel htmlFor="option1" className="text-sm">
              Checkbox text
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox defaultChecked id="option2" name="option2" />
            <FieldLabel htmlFor="option2" className="text-sm">
              Checkbox text
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox autoFocus id="option3" name="option3" />
            <FieldLabel htmlFor="option3" className="text-sm">
              Checkbox text
            </FieldLabel>
          </Field>
          <Field>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={checked}
                aria-invalid={hasError}
                onCheckedChange={(val) => {
                  setChecked(val as boolean);
                  setTouched(true);
                }}
                id="option4"
                name="option4"
              />
              <FieldLabel htmlFor="option4" className="text-sm">
                Checkbox text
              </FieldLabel>
            </div>
            {hasError && (
              <FieldError className="text-sm text-text-danger">
                You must accept terms and conditions
              </FieldError>
            )}
          </Field>
        </FieldGroup>
      </div>
    </main>
  );
}
