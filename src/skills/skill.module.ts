import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  Skill from './skill.entity';
import { SkillService } from './skill.services';
import { SkillController } from './skill.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
