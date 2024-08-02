import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Experienceentities from './experience.entities';
import { ExperienceService } from './experience.services';
import { ExperienceController } from './experience.controller';
import { UserRepo } from 'src/user/userrepo/user.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Experienceentities, UserRepo])],
  providers: [ExperienceService, UserRepo],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
