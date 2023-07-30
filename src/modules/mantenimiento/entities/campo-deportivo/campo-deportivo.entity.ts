import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { Deporte } from '../deporte/deporte.entity';
import { ImagenCampo } from './imagen-campo.entity';

@Entity()
export class CampoDeportivo extends DefaultEntity {
	@Column({ unique: true })
	alias: string;

	@Column()
	titulo: string;

	@Column()
	descripcion: string;

	@Column({ default: 'LIBRE' })
	estado: string;

	@Column()
	eventos: boolean;

	@ManyToMany(() => Deporte, deporte => deporte.campoDeportivos)
	deportes: Deporte[];

	@OneToMany(() => ImagenCampo, imagenesCampo => imagenesCampo.campoDeportivo)
	imagenesCampo: ImagenCampo[];
}
