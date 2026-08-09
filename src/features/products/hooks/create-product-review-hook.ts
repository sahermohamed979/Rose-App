'use client ';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import CreateProductReviewAction from '../apis/create-product-review-action';

export default function CreateProductReviewHook() {
  const [errorMsg, seterrorMsg] = useState('');
  const [IsSuccess, setIsSuccess] = useState(false);
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['product-review'],
    mutationFn: CreateProductReviewAction,
    onSuccess: (data) => {
      setIsSuccess(true);
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
