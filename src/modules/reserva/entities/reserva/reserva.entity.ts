import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { Adicional } from '../../../mantenimiento/entities/adicional/adicional.entity';
import { TipoReserva } from '../../../mantenimiento/entities/tipo-reserva/tipo-reserva.entity';

@Entity()
export class Reserva extends DefaultEntity {
	@Column({ unique: true })
	hash: string;

	@Column()
	cliente_nombre: string;

	@Column()
	cliente_dni: string;

	@Column()
	cliente_alias: string;

	@Column()
	cliente_celular: string;

	@Column({ nullable: true })
	desc_evento: string;

	@Column()
	fecha_reserva: Date;

	@Column()
	hora_inicio: string;

	@Column()
	hora_fin: string;

	@ManyToOne(() => TipoReserva, tipoReserva => tipoReserva.reservas)
	tipoReserva: TipoReserva;

	@ManyToMany(() => Adicional, adicional => adicional.reservas)
	@JoinTable()
	adicionales: Adicional[];
}
