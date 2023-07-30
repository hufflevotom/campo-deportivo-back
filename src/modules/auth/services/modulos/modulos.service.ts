import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ModulosDto, ModulosLimitDto, UpdateModulosDto } from '../../dtos/modulos/modulos.dto';
import { Modulo } from '../../entities/modulo/modulo.entity';
import { Rol } from '../../entities/rol/rol.entity';

@Injectable()
export class ModulosService {
	constructor(
		@InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
		@InjectRepository(Modulo) private readonly modulosRepository: Repository<Modulo>,
	) {}

	findAll(query: ModulosLimitDto) {
		return this.modulosRepository.findAndCount({
			skip: query.offset,
			take: query.limit,
			order: { nombre: 'ASC' },
			where: { nombre: Like('%' + (query.busqueda ? query.busqueda : '') + '%') },
		});
	}

	findOne(id: number) {
		return this.modulosRepository.findOne({ where: { id } });
	}

	create(modulos: ModulosDto) {
		const model: Modulo = new Modulo();
		model.nombre = modulos.nombre;

		return this.modulosRepository.save(model);
	}

	update(id: number, modulos: UpdateModulosDto) {
		const model: Modulo = new Modulo();
		model.nombre = modulos.nombre;

		return this.modulosRepository.update(id, modulos);
	}

	delete(id: number) {
		return this.modulosRepository.softDelete(id);
	}
}
