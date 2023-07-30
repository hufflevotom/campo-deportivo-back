import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Reserva } from '../../entities/reserva/reserva.entity';

import { ReservaDto, UpdateReservaDto } from '../../dtos/reserva/reserva.dto';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { generateHash } from '../../../../utils/utils';
import { TipoReserva } from '../../../mantenimiento/entities/tipo-reserva/tipo-reserva.entity';
import { Adicional } from '../../../mantenimiento/entities/adicional/adicional.entity';

@Injectable()
export class ReservaService {
	constructor(@InjectRepository(Reserva) private readonly reservaRepository: Repository<Reserva>) {}

	findAll(limit: LimitDto) {
		limit.search = limit.search ? limit.search : '';

		return this.reservaRepository.find({
			relations: ['tipoReserva', 'adicionales'],
			skip: limit.skip,
			take: limit.take,
			where: [
				{
					cliente_nombre: ILike(`%${limit.search}%`),
				},
				{
					cliente_alias: ILike(`%${limit.search}%`),
				},
				{
					cliente_dni: ILike(`%${limit.search}%`),
				},
			],
		});
	}

	findOne(id: number) {
		return this.reservaRepository.findOne({
			relations: ['tipoReserva', 'adicionales'],
			where: {
				id,
			},
		});
	}

	create(reservaDto: ReservaDto) {
		const reserva = this.reservaRepository.create(reservaDto);

		const tipoReserva = new TipoReserva();
		tipoReserva.id = reservaDto.tipoReservaId;
		reserva.tipoReserva = tipoReserva;

		reserva.fecha_reserva = new Date(reservaDto.fecha_reserva);

		reserva.hash = generateHash(10);

		reserva.adicionales = [];
		reservaDto.adicionalesId.forEach(adicionalId => {
			const adicional = new Adicional();
			adicional.id = adicionalId;
			reserva.adicionales.push(adicional);
		});

		return this.reservaRepository.save(reserva);
	}

	async update(id: number, reservaDto: UpdateReservaDto) {
		const reservaDB = await this.reservaRepository.findOne({
			where: {
				id,
			},
		});

		if (!reservaDB) {
			throw new NotFoundException('No se encontro la reserva');
		}

		this.reservaRepository.merge(reservaDB, reservaDto);

		if (reservaDto.adicionalesId) {
			reservaDB.adicionales = [];
			reservaDto.adicionalesId.forEach(adicionalId => {
				const adicional = new Adicional();
				adicional.id = adicionalId;
				reservaDB.adicionales.push(adicional);
			});
		}

		if (reservaDto.fecha_reserva) {
			reservaDB.fecha_reserva = new Date(reservaDto.fecha_reserva);
		}

		if (reservaDto.tipoReservaId) {
			const tipoReserva = new TipoReserva();
			tipoReserva.id = reservaDto.tipoReservaId;
			reservaDB.tipoReserva = tipoReserva;
		}

		return this.reservaRepository.save(reservaDB);
	}

	delete(id: number) {
		return this.reservaRepository.softDelete(id);
	}
}
