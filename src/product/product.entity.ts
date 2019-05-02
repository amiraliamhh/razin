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

    @Column({ type: 'boolean', default: true })
    in_stock: boolean;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: false })
    archived: boolean;
}
