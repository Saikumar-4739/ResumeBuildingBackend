import { AddressModel} from "../../address/models/address.model";

export class UserCreateRequest {
    uname: string;
    email: string;
    mobileNo: number;
    address: AddressModel[];
    userId?: number; 
    createDate: string;
 
}
