'use client ';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import CreateProductReviewAction from '../apis/create-product-review-action';

export default function CreateProductReviewHook() {
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['product-review'],
    mutationFn: CreateProductReviewAction,
    onSuccess: (data) => {
      console.log('Success', data);
    },
    onError: (error) => {
      console.log('Error', error);
    },
  });
  return {
    mutate,
    isError,
    isPending,
  };
}
