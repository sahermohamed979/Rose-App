'use client ';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CreateProductReviewAction } from '../apis/create-product-review-action';
import { useRouter } from 'next/navigation';

export default function CreateProductReviewHook() {
  const router = useRouter();
  const [errorMsg, seterrorMsg] = useState('');
  const [IsSuccess, setIsSuccess] = useState(false);
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['product-review'],
    mutationFn: CreateProductReviewAction,
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
