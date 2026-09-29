interface RemoveProductSuccess {
  status: true;
  code: number;
  message: string;
}

interface RemoveProductError {
  status: false;
  code: number;
  message: string;
}

export type RemoveProductResponse =
  | RemoveProductSuccess
  | RemoveProductError;
