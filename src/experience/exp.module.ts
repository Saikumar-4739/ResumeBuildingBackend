import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Experience from './exp.entities';
import { ExperienceService } from './exp.services';
import { ExperienceController } from './exp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
