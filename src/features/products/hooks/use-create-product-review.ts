'use client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProductReviewAction } from '../apis/create-product-review-action';

export default function useCreateProductReviewHook() {
  const router = useRouter();
  const [errorMsg, seterrorMsg] = useState('');
  const [IsSuccess, setIsSuccess] = useState(false);
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['product-review'],
    mutationFn: createProductReviewAction,
    onSuccess: (data) => {
      setIsSuccess(true);
      router.refresh();
    },
    onError: (error) => {
      seterrorMsg(error.message);
    },
  });
  return {
    mutate,
    isError,
    isPending,
    errorMsg,
    IsSuccess,
  };
}
