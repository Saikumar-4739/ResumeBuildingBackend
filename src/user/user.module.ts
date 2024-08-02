import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.services';
import { UserController } from './user.controller';
import { AddressModule } from 'src/address/address.module';
import { UserRepo } from './userrepo/user.repo';
import UserEntity from './user.entities';
import { AddressRepo } from 'src/address/models/address.repo';
import AddressEntities from 'src/address/address.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AddressEntities]),
    AddressModule
  ],
  providers: [UserService,  UserRepo, AddressRepo],
  controllers: [UserController],
})
export class UserModule {} 
