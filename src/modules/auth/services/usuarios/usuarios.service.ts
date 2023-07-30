import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/modules/auth/services/roles/roles.service';
import { Like, Repository } from 'typeorm';
import { UpdateUsuarioDto, UsuarioDto, UsuarioLimitDto } from '../../dtos/usuario/usuario.dto';
import { Usuario } from '../../entities/usuario/usuario.entity';

@Injectable()
export class UsuariosService {
	constructor(
		@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
		private rolesService: RolesService,
	) {}

	findAll(query: UsuarioLimitDto) {
		return this.usuarioRepository.findAndCount({
			relations: ['role'],
			skip: query.offset,
			take: query.limit,
			order: { nombres: 'ASC' },
			where: [
				{ nombres: Like('%' + (query.busqueda ? query.busqueda : '') + '%') },
				{ apellidos: Like('%' + (query.busqueda ? query.busqueda : '') + '%') },
			],
		});
	}

	findOne(id: number) {
		return this.usuarioRepository.findOne({
			where: { id },
			relations: ['role'],
		});
	}

	findUsuarioByEmail(email: string) {
		return this.usuarioRepository.findOne({ where: { email }, relations: ['role'] });
	}

	async create(usuario: UsuarioDto) {
		const newUsuario = this.usuarioRepository.create(usuario);
		const hashedPassword = await bcrypt.hash(newUsuario.password, 10);
		newUsuario.password = hashedPassword;

		const rol = await this.rolesService.findOne(usuario.rolId);
		if (rol) {
			newUsuario.role = rol;
		} else {
			throw new NotFoundException('El rol no existe');
		}

		const response = this.usuarioRepository.save(newUsuario);
		return response;
	}

	async update(id: number, usuario: UpdateUsuarioDto) {
		const usuarioActualizar = await this.usuarioRepository.findOne({ where: { id } });
		this.usuarioRepository.merge(usuarioActualizar, usuario);
		if (usuario.password) {
			const hashedPassword = await bcrypt.hash(usuario.password, 10);
			usuarioActualizar.password = hashedPassword;
		}

		if (usuario.rolId) {
			const rol = await this.rolesService.findOne(usuario.rolId);
			if (rol) {
				usuarioActualizar.role = rol;
			} else {
				throw new NotFoundException('El rol no existe');
			}
		}

		const response = this.usuarioRepository.save(usuarioActualizar);
		return response;
	}

	async delete(id: number) {
		const response = this.usuarioRepository.softDelete(id);
		return response;
	}
}
