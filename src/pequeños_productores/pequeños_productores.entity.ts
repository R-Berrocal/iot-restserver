import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('pequeños_productores')
export class PequeñosProductores {
  @PrimaryGeneratedColumn()
  idPequeñosProductores: number;

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

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
