import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Vereda } from 'src/vereda/entities/vereda.entity';
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
export class Municipio {
  @PrimaryGeneratedColumn()
  idMunicipio: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios)
  departamento: Departamento;

  @OneToMany(() => Vereda, (vereda) => vereda.municipio)
  veredas: Vereda;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
