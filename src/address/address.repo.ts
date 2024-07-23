import { DataSource, Repository } from "typeorm";
import { Address } from "./address.entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressRepo extends Repository <Address> {
    constructor(private datasource: DataSource) {
        super(Address, datasource.createEntityManager());
    }


    // async getAddressInfo(): Promsie<> {
    //     await this.createQueryBuilder('add').select().getMany();
    // }
}