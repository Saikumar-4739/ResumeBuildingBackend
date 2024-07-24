import AcademicModel from 'src/academics/acad.model';
import ExperienceModel from 'src/experience/exp.model';
import PersonalDetailsUpdateRequest from 'src/pdetails/pdupdate.model';
import SkillModel from 'src/skills/skill.model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', {
    name: 'user_id',
  })
  userId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;

  @Column()
  createdate: string;
  experience: ExperienceModel;
  academics: AcademicModel;
  skills: SkillModel;
  personaldetails: PersonalDetailsUpdateRequest;
}
