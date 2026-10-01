import { z } from 'zod';

import { getAddProductSchema } from './add-product-schema';

type Translate = (key: string) => string;

const optionalFiles = z.custom<FileList>(
  (value) => value === undefined || value instanceof FileList
);

export const getEditProductSchema = (t: Translate) =>
  getAddProductSchema(t).extend({
    productCover: optionalFiles,
    productGallery: optionalFiles,
  });

export type EditProductFormValues = z.infer<
  ReturnType<typeof getEditProductSchema>
>;
