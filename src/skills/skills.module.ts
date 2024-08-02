import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  SkillEntities from './skills.entities';
import { SkillService } from './skills.services';
import { SkillController } from './skills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntities])],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
