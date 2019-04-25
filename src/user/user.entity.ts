import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    date_created: string;

    @Column({ type: 'char', nullable: true, length: 40 })
    first_name: string;

    @Column({ type: 'char', nullable: true, length: 40 })
    last_name: string;

    @Column({ type: 'char', unique: true, nullable: true, length: 50 })
    email: string;

    @Column({ type: 'char', unique: true, nullable: false, length: 14 })
    phone_number: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'char', nullable: false, length: 100 })
    password: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    phone_number_is_approved: boolean;

    @Column({ type: 'text', nullable: true })
    postal_code: string;

    @Column({ type: 'char', nullable: true, length: 18 })
    telephone: string;
}