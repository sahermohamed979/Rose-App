import { z } from 'zod';

type Translate = (key: string) => string;

const requiredFiles = (message: string) =>
  z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    { message }
  );

const optionalFiles = z.custom<FileList>(
  (value) => value instanceof FileList
);

export const getAddProductSchema = (t: Translate) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, {
        message: t('errors.titleRequired'),
      }),
    description: z
      .string()
      .trim()
      .min(1, {
        message: t('errors.descriptionRequired'),
      }),
    price: z
      .number({ error: t('errors.pricePositive') })
      .positive({ message: t('errors.pricePositive') })
      .multipleOf(0.01, { message: t('errors.priceDecimals') }),
    discount: z
      .number({ error: t('errors.discountRange') })
      .min(0, { message: t('errors.discountRange') })
      .max(100, { message: t('errors.discountRange') })
      .multipleOf(0.01, { message: t('errors.discountDecimals') }),
    quantity: z
      .number({ error: t('errors.quantityNonNegative') })
      .int({ message: t('errors.quantityNonNegative') })
      .nonnegative({ message: t('errors.quantityNonNegative') }),
    productCover: requiredFiles(t('errors.productCoverRequired')),
    productGallery: optionalFiles,
    category: z.string().min(1, {
      message: t('errors.categoryRequired'),
    }),
    occasion: z.string().min(1, {
      message: t('errors.occasionRequired'),
    }),
  });

export type AddNewProductFormValues = z.infer<
  ReturnType<typeof getAddProductSchema>
>;
