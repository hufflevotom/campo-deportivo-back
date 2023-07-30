import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { CampoDeportivo } from './campo-deportivo.entity';

@Entity()
export class ImagenCampo extends DefaultEntity {
	@Column()
	imagenUrl: string;

	@Column()
	alt: string;

	@ManyToOne(() => CampoDeportivo, campoDeportivo => campoDeportivo.imagenesCampo)
	campoDeportivo: CampoDeportivo;
}
