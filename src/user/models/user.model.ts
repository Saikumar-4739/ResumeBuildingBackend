import {AddressModel } from "../../address/models/address.model";
;


export class UserModel {
    uname: string;
    email: string;
    mobileNo: number;
    createdate: Date;
    userId?: number;
    address: AddressModel ;
}

