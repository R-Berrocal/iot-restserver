import { Cultivo } from 'src/cultivo/entities/cultivo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'pequeño_productor' })
export class PequeñoProductor {
  @PrimaryGeneratedColumn()
  idPequeñoProductor: number;

  @Column('varchar')
  nombre1: string;

  @Column('varchar', { nullable: true })
  nombre2: string;

  @Column('varchar')
  apellido1: string;

  @Column('varchar', { nullable: true })
  apellido2: string;

  @Column('varchar', { unique: true })
  correo: string;

  @Column('varchar')
  contraseña: string;

  @OneToMany(() => Cultivo, (cultivo) => cultivo.pequeño_productor)
  cultivos: Cultivo[];

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
