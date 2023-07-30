import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { CampoDeportivo } from '../campo-deportivo/campo-deportivo.entity';

@Entity()
export class Deporte extends DefaultEntity {
	@Column({ unique: true })
	nombre: string;

	@Column()
	descripcion: string;

	@Column({ nullable: true })
	imagenUrl: string;

	@Column({ default: true })
	disponible: boolean;

	@ManyToMany(() => CampoDeportivo, campoDeportivo => campoDeportivo.deportes)
	@JoinTable()
	campoDeportivos: CampoDeportivo[];
}
