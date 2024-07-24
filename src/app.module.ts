import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceModule } from './experience/exp.module';
import { AcademicModule } from './academics/aca.module';
import { SkillModule } from './skills/skill.module';
import { PersonalDetailsModule } from './pdetails/pdetails.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 3306,
      database: 'resume_building',
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AddressModule,
    ExperienceModule,
    AcademicModule,
    SkillModule,
    PersonalDetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
