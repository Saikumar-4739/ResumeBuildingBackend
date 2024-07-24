import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  Academic from './acad.entities';
import { AcademicService } from './aca.services';
import { AcademicController } from './aca.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Academic])],
  providers: [AcademicService],
  controllers: [AcademicController],
})
export class AcademicModule {}
