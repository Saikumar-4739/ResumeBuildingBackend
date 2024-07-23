import { AddressModel } from '../user/models/address.model';

export interface AddressResponse {
  status: boolean;
  internalMessage: string;
  data: AddressModel[];
  errorCode: number;
}
