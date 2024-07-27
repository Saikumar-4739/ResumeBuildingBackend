import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('declaration')
class DeclarationEntities{
@PrimaryGeneratedColumn('increment', {
  name: 'declaration_id',
})
  declarationId: number;

  @Column()
  userId: number;

  @Column()
  date: string;

  @Column()
  place: string;
}

export default DeclarationEntities;