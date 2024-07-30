import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Experienceentities from './experience.entities';
import { ExperienceService } from './experience.services';
import { ExperienceController } from './experience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experienceentities])],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
