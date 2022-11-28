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
export class Gasto {
  @PrimaryGeneratedColumn()
  idGasto: number;

  @Column('varchar')
  tipo: string;

  @Column('integer')
  cantidad: number;

  @Column('text')
  descripcion: string;

  @Column('float')
  costo: number;

  @ManyToOne(() => Cultivo, (cultivo) => cultivo.gastos)
  cultivo: Cultivo;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
