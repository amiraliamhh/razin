import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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
}