export class ProductActionError extends Error {
  constructor(message?: string) {
    super(message ?? '');
    this.name = 'ProductActionError';
  }
}
