import { Cultivo } from 'src/cultivo/entities/cultivo.entity';
import { Municipio } from 'src/municipio/entities/municipio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Cultivo, (cultivo) => cultivo.vereda)
  cultivos: Cultivo;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
