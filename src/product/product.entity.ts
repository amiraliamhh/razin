import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'simple-array', nullable: true })
    gallery: string[];

    @Column({ type: 'int', nullable: true })
    off: number;
}
