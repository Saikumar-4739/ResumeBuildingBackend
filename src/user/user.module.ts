import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.services';
import { UserController } from './user.controller';
import { AddressModule } from 'src/address/address.module';
import { UserRepo } from './userrepo/user.repo';
import UserEntity from './user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AddressModule
  ],
  providers: [UserService,  UserRepo],
  controllers: [UserController],
})
export class UserModule {} 
