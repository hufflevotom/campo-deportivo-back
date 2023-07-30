import { Column, Entity, ManyToMany } from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';

@Entity()
export class Modulo extends DefaultEntity {
	@Column()
	nombre: string;

	@ManyToMany(() => Rol, rol => rol.modulos)
	roles: Rol[];
}
