import {AddressModel } from "./address.model";


export class UserModel {
    uname: string;
    email: string;
    mobileNo: string;
    createdate: string;
    userId?: number;
    address: AddressModel ;
}

