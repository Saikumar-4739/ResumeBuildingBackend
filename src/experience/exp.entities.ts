import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
class Experience {
  @PrimaryGeneratedColumn('increment', {
    name: 'experience_id',
  })
  experienceId: number;

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

  @Column()
  userId: number;
}

export default Experience;