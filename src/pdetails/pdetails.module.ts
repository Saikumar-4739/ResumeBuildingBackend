import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  PersonalDetails  from './pdetails.entity';
import { PersonalDetailsService } from './pdetails.services';
import { PersonalDetailsController } from './pdetails.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalDetails])],
  providers: [PersonalDetailsService],
  controllers: [PersonalDetailsController],
})
export class PersonalDetailsModule {}
