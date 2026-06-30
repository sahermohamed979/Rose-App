'use client';

import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/input-password';
import { PhoneInput } from '@/shared/components/ui/input-phone';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import Link from 'next/link';
import React from 'react';

export default function RegisterForm() {
  return (
    <div>
      <ThemeToggle />
      <form
        className="space-y-4 "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-row gap-4">
          <div className="space-y-1">
            <Label>First name</Label>
            <Input placeholder="Jonathan" />
          </div>
          <div className="space-y-1">
            <Label>Second name</Label>
            <Input placeholder="Adrian" />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input type="email" placeholder="user@example.com" />
        </div>
        <div className="space-y-1">
          <Label>Phone</Label>
          <PhoneInput placeholder="1012345678" />
        </div>
        <div className="space-y-1">
          <Label>Gender</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Password</Label>
          <PasswordInput placeholder="********" />
        </div>
        <div className="space-y-1">
          <Label>Confirm Password</Label>
          <PasswordInput placeholder="********" />
        </div>
        <Button className="bg-bg-primary-saturated w-full text-text-inverse p-4">
          Create Account
        </Button>
      </form>
      {/* <p className='flex justify-center my-2'>
        Already have an account?
        <Link href="/login" className="text-text-primary">
          Login
        </Link>
      </p> */}
    </div>
  );
}
