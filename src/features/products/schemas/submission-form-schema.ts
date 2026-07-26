import React from 'react';
import z from 'zod/v3';

export default function SubmissionFormSchema() {
  return z.object({
    headline: z
      .string()
      .min(5, 'Bug title must be at least 5 characters.')
      .max(32, 'Bug title must be at most 32 characters.'),
    content: z
      .string()
      .min(20, 'Description must be at least 20 characters.')
      .max(100, 'Description must be at most 100 characters.'),
    rating: z.number().min(1).max(5),
  });
}
