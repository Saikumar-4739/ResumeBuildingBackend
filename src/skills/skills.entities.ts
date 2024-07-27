import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill')
class Skill {
  @PrimaryGeneratedColumn('increment', { name: 'skill_id' })
  skillId: number;

  @Column()
  skillName: string;

  @Column()
  department: string;

  @Column()
  userId: number;
}
export default Skill;