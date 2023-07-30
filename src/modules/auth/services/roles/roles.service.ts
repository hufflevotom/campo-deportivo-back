import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { RolesDto, RolesLimitDto, UpdateRolesDto } from '../../dtos/roles/roles.dto';
import { Modulo } from '../../entities/modulo/modulo.entity';
import { Rol } from '../../entities/rol/rol.entity';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Modulo) private readonly modulosRespository: Repository<Modulo>,
		@InjectRepository(Rol) private readonly rolesRepository: Repository<Rol>,
	) {}

	findAllPagination(query: RolesLimitDto) {
		return this.rolesRepository.findAndCount({
			skip: query.offset,
			take: query.limit,
			relations: ['modulos'],
			order: { nombre: 'ASC' },
			where: { nombre: Like('%' + (query.busqueda ? query.busqueda : '') + '%') },
		});
	}

	findOne(id: number) {
		return this.rolesRepository.findOne({
			where: { id },
			relations: ['modulos'],
		});
	}

	async create(rol: RolesDto) {
		const modulos = [];
		for (const moduloId of rol.modulosId) {
			const mod = await this.modulosRespository.findOne({ where: { id: moduloId } });
			if (mod) {
				modulos.push(mod);
			}
		}
		const newRol = new Rol();
		newRol.nombre = rol.nombre;
		newRol.modulos = modulos;
		const response = this.rolesRepository.save(newRol);
		return response;
	}

	async update(id: number, rol: UpdateRolesDto) {
		const rolActualizar = await this.rolesRepository.findOne({
			where: { id },
			relations: ['modulos'],
		});

		if (!rolActualizar) {
			throw new NotFoundException('El rol no existe');
		}

		this.rolesRepository.merge(rolActualizar, rol);

		if (rol.modulosId) {
			const modulos = [];
			for (const moduloId of rol.modulosId) {
				const mod = await this.modulosRespository.findOne({ where: { id: moduloId } });
				if (mod) {
					modulos.push(mod);
				}
			}
			rolActualizar.modulos = modulos;
		}
		const response = this.rolesRepository.save(rolActualizar);
		return response;
	}

	async delete(id: number) {
		const response = this.rolesRepository.softDelete(id);
		return response;
	}
}
