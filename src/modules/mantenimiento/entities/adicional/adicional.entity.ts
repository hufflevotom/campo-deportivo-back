import { Column, Entity, ManyToMany } from 'typeorm';
import { DefaultEntity } from '../../../database/entities/default-entity.entity';
import { Reserva } from '../../../reserva/entities/reserva/reserva.entity';

@Entity()
export class Adicional extends DefaultEntity {
	@Column({ unique: true })
	nombre: string;

	@Column()
	precio_hora: string;

	@ManyToMany(() => Reserva, reserva => reserva.adicionales)
	reservas: Reserva[];
}
