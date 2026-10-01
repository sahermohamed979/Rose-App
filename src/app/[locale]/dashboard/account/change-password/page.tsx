import ChangePasswordForm from '@/features/account-setting/components/change-password-form';
import React from 'react';

export default function ChangePasswordPage() {
  return (
    <main className="w-full mx-auto py-6 px-4 md:px-0 lg:px-10 ">
      <div className="bg-bg-plain rounded-2xl shadow-subtle p-6 md:p-8">
        <ChangePasswordForm />
      </div>
    </main>
  );
}
