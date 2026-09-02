import { ApiResponse } from './api';

export interface IAddress {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressesPayload {
  addresses: IAddress[];
}

export type AddressesResponse = ApiResponse<AddressesPayload>;
