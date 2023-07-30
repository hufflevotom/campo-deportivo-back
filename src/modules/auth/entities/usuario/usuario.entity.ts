import { Exclude } from 'class-transformer';
import { Rol } from 'src/modules/auth/entities/rol/rol.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';

@Entity()
export class Usuario extends DefaultEntity {
	@Column()
	nombres: string;

	@Column()
	apellidos: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	dni: string;

	@Exclude()
	@Column()
	password: string;

	@ManyToOne(() => Rol, rol => rol.usuarios)
	role: Rol;

	@Column({ nullable: true })
	celular: number;
}
