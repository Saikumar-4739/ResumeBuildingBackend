import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from "./address.entities"
import { AddressService } from './address.services';
import { AddressRepo } from './address.repo';


@Module({
  imports: [
    TypeOrmModule.forFeature([Address])
  ],
  providers: [AddressService, AddressRepo],
  exports: [AddressService]
})
export class AddressModule {} 
