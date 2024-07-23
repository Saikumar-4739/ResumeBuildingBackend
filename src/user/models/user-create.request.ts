import { AddressModel} from "./address.model";

export class UserCreateRequest {
    uname: string;
    email: string;
    mobileNo: string;
    address: AddressModel[];
    userId?: number; 
    createDate: any;
 
}
