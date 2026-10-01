export type ProductActionResult =
  | { success: true }
  | { success: false; message?: string };
