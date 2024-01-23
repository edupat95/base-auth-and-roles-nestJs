import { Delete } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Documento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: false, nullable: true })
    numeroTramite: number;

    @Column({ length: 255, unique: false, nullable: false })
    apellidos: string;

    @Column({ length: 255, unique: false, nullable: false })
    nombres: string;
    
    @Column({ length: 1, unique: false, nullable: true })
    sexo: string;

    @Column({unique: true, nullable: false })
    numeroDni: number;

    @Column({ length: 20, unique: false, nullable: true })
    ejemplar: string;

    @Column({ type: 'date', nullable: true })
    nacimiento: Date;

    @Column({ type: 'date', nullable: true })
    fechaEmision: Date;

    @Column({ unique: false, nullable: true })
    inicioFinCuil: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}

