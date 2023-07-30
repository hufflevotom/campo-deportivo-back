import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deporte } from '../../entities/deporte/deporte.entity';
import { ILike, Like, Repository } from 'typeorm';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { DeporteDto, UpdateDeporteDto } from '../../dtos/deporte/deporte.dto';
import { Adicional } from '../../entities/adicional/adicional.entity';
import { AdicionalDto, UpdateAdicionalDto } from '../../dtos/adicional/adicional.dto';
// import { Adicional } from '../../entities/adicional/adicional.entity';

@Injectable()
export class AdicionalService {
	constructor(
		@InjectRepository(Adicional) private readonly adicionalRepository: Repository<Adicional>,
	) {}

	findAll(limit: LimitDto) {
		limit.search = limit.search ? limit.search : '';

		return this.adicionalRepository.find({
			skip: limit.skip,
			take: limit.take,
			where: [
				{
					nombre: Like(`%${limit.search}%`),
				},
			],
		});
	}

	findOne(id: number) {
		return this.adicionalRepository.findOne({
			// relations: ['campoDeportivos'],
			where: {
				id,
			},
		});
	}

	async create(adicionalDto: AdicionalDto) {
		// buscamos el deporte en la base de datos
		const adicionalDB = await this.adicionalRepository.findOne({
			where: {
				nombre: ILike(adicionalDto.nombre),
			},
			withDeleted: true,
		});

		// console.log(deporteDb);

		let adicional: Adicional;
		// si existe el deporte en la base de datos, actualizamos los datos y si no lo creamos
		if (adicionalDB) {
			adicional = adicionalDB;
			adicional.nombre = adicionalDB.nombre;
			adicional.precio_hora = adicionalDB.precio_hora;
		} else {
			adicional = this.adicionalRepository.create(adicionalDto);
		}

		// guardamos el deporte modificado o creado
		return this.adicionalRepository.save(adicional);
	}

	update(id: number, updateAdicionalDto: UpdateAdicionalDto) {
		return this.adicionalRepository.update(id, updateAdicionalDto);
	}

	delete(id: number) {
		return this.adicionalRepository.softDelete(id);
	}
}
