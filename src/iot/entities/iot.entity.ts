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
export class Iot {
  @PrimaryGeneratedColumn()
  idIot: number;

  @Column('float')
  temperatura: number;

  @Column('float')
  humedad: number;

  @Column('float')
  ph: number;

  @ManyToOne(() => Cultivo, (cultivo) => cultivo.iots)
  cultivo: Cultivo;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
