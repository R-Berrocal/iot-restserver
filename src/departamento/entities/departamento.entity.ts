import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  idDepartamento: number;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
