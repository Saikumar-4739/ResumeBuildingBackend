import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
class Experienceentities {
  @PrimaryGeneratedColumn('increment', {
    name: 'experience_id',
  })
  experienceId: number;

  @Column()
  userId: number;

  @Column()
  objective: string;

  @Column()
  companyName: string;

  @Column()
  role: string;

  @Column()
  fromYear: number;

  @Column()
  toYear: number;

  @Column({ type: 'text', nullable: true })
  description?: string;
}

export default  Experienceentities;