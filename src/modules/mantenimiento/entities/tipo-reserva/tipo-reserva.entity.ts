import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { Reserva } from '../../../reserva/entities/reserva/reserva.entity';

@Entity()
export class TipoReserva extends DefaultEntity {
	@Column({ unique: true })
	nombre: string;

	@OneToMany(() => Reserva, reserva => reserva.tipoReserva)
	reservas: Reserva[];
}
