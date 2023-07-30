import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { TipoReservaDto, UpdateTipoReservaDto } from '../../dtos/tipo-reserva/tipo-reserva.dto';
import { TipoReserva } from '../../entities/tipo-reserva/tipo-reserva.entity';

@Injectable()
export class TipoReservaService {
	constructor(
		@InjectRepository(TipoReserva) private readonly tipoReservaRepository: Repository<TipoReserva>,
	) {}

	findAll(limit: LimitDto) {
		limit.search = limit.search ? limit.search : '';

		return this.tipoReservaRepository.find({
			skip: limit.skip,
			take: limit.take,
			where: [
				{
					nombre: ILike(`%${limit.search}%`),
				},
			],
		});
	}

	findOne(id: number) {
		return this.tipoReservaRepository.findOne({
			where: {
				id,
			},
		});
	}

	async create(tipoReservaDto: TipoReservaDto) {
		// buscamos el deporte en la base de datos
		const tipoReservalDB = await this.tipoReservaRepository.findOne({
			where: {
				nombre: ILike(tipoReservaDto.nombre),
			},
			withDeleted: true,
		});

		let tipoReserva: TipoReserva;

		if (tipoReservalDB) {
			tipoReserva = tipoReservalDB;
			tipoReserva.nombre = tipoReservalDB.nombre;
		} else {
			tipoReserva = this.tipoReservaRepository.create(tipoReservaDto);
		}

		return this.tipoReservaRepository.save(tipoReserva);
	}

	update(id: number, updateTipoReservaDto: UpdateTipoReservaDto) {
		return this.tipoReservaRepository.update(id, updateTipoReservaDto);
	}

	delete(id: number) {
		return this.tipoReservaRepository.softDelete(id);
	}
}
