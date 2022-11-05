import { Municipio } from 'src/municipio/entities/municipio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vereda {
  @PrimaryGeneratedColumn()
  idVereda: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.veredas)
  municipio: Municipio;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
