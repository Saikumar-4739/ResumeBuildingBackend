import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('address')
export class Address{
    @PrimaryGeneratedColumn ('increment',{
        name: 'address_id',
    })
    addressId: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zipcode: number;

    @Column()
    userId: number; // user_id / company_id / factory_id

}