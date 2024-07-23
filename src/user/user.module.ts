import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entities';
import { UserService } from './user.services';
import { UserController } from './user.controller';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AddressModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {} 
