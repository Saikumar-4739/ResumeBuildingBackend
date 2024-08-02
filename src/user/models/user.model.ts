import { AddressModel } from "../../address/models/address.model";

export class UserModel {
    uname: string;
    email: string;
    mobileNo: String;
    createdate?: Date;
    userId?: number;
    address: AddressModel| null ;
}
