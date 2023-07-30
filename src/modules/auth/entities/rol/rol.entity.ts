import { Usuario } from 'src/modules/auth/entities/usuario/usuario.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Modulo } from '../modulo/modulo.entity';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';

@Entity()
export class Rol extends DefaultEntity {
	@Column()
	nombre: string;

	@ManyToMany(() => Modulo, modulo => modulo.roles)
	@JoinTable()
	modulos: Modulo[];

	@OneToMany(() => Usuario, usuario => usuario.role)
	usuarios: Usuario[];
}
