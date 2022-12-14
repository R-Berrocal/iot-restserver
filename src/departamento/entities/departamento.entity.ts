import { Municipio } from 'src/municipio/entities/municipio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  idDepartamento: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Municipio, (municipio) => municipio.departamento)
  municipios: Municipio;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
