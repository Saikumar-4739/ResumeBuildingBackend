import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personal_details')
class PersonalDetails {
  @PrimaryGeneratedColumn('increment', { name: 'details_id' })
  detailsId: number;

  @Column()
  userId: number;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  maritalStatus: string;

  @Column('simple-array')
  languagesKnown: string[];
}

export default PersonalDetails;