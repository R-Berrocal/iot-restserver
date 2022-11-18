import { PequeñoProductor } from 'src/pequeño_productor/entities/pequeño_productor.entity';
import { Vereda } from 'src/vereda/entities/vereda.entity';
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
export class Cultivo {
  @PrimaryGeneratedColumn()
  idCultivo: number;

  @Column('integer')
  hectareas: number;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('datetime')
  fecha_siembre: Date;

  @ManyToOne(
    () => PequeñoProductor,
    (pequeño_productor) => pequeño_productor.cultivos,
  )
  pequeño_productor: PequeñoProductor;

  @ManyToOne(() => Vereda, (vereda) => vereda.cultivos)
  vereda: Vereda;

  @CreateDateColumn()
  creteadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
