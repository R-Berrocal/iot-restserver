import { Cultivo } from 'src/cultivo/entities/cultivo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Informe {
  @PrimaryGeneratedColumn()
  idInforme: number;

  @Column('float')
  temperaturaMinima: number;

  @Column('float')
  temperaturaPromedio: number;

  @Column('float')
  temperaturaMaxima: number;

  @Column('float')
  humedadMinima: number;

  @Column('float')
  humedadPromedio: number;

  @Column('float')
  humedadMaxima: number;

  @Column('float')
  phMinimo: number;

  @Column('float')
  phPromedio: number;

  @Column('float')
  phMaximo: number;

  @ManyToOne(() => Cultivo, (cultivo) => cultivo.informes)
  cultivo: Cultivo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
