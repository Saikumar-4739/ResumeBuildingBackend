import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class UserEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'user_id',
  })
  userId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: number;

  @Column()
  createdate: Date;
}
export default UserEntity;