import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deporte } from '../../entities/deporte/deporte.entity';
import { ILike, Like, Repository } from 'typeorm';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { DeporteDto, UpdateDeporteDto } from '../../dtos/deporte/deporte.dto';

@Injectable()
export class DeporteService {
	constructor(@InjectRepository(Deporte) private readonly deporteRepository: Repository<Deporte>) {}

	findAll(limit: LimitDto) {
		limit.search = limit.search ? limit.search : '';

		return this.deporteRepository.find({
			skip: limit.skip,
			take: limit.take,
			where: [
				{
					descripcion: Like(`%${limit.search}%`),
				},
				{
					nombre: Like(`%${limit.search}%`),
				},
			],
		});
	}

	findOne(id: number) {
		return this.deporteRepository.findOne({
			relations: ['campoDeportivos'],
			where: {
				id,
			},
		});
	}

	async create(deporteDto: DeporteDto) {
		// buscamos el deporte en la base de datos
		const deporteDb = await this.deporteRepository.findOne({
			where: {
				nombre: ILike(deporteDto.nombre),
			},
			withDeleted: true,
		});

		console.log(deporteDb);

		let deporte: Deporte;
		// si existe el deporte en la base de datos, actualizamos los datos y si no lo creamos
		if (deporteDb) {
			deporte = deporteDb;
			deporte.descripcion = deporteDto.descripcion;
			deporte.imagenUrl = deporteDto.imagenUrl;
		} else {
			deporte = this.deporteRepository.create(deporteDto);
		}

		// guardamos el deporte modificado o creado
		return this.deporteRepository.save(deporte);
	}

	update(id: number, deporteDto: UpdateDeporteDto) {
		return this.deporteRepository.update(id, deporteDto);
	}

	delete(id: number) {
		return this.deporteRepository.softDelete(id);
	}
}
