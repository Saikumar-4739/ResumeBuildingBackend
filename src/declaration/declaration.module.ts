// declaration/declaration.module.ts
import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.services';
import { DeclarationController } from './declaration.controller';
import DeclarationEntities from './declaration.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeclarationEntities])],
  providers: [DeclarationService],
  controllers: [DeclarationController],
})
export class DeclarationModule {}
