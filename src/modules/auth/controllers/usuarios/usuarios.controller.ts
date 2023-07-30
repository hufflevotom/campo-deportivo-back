import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { customResponse } from 'src/common/reponse';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard';

import { UpdateUsuarioDto, UsuarioDto, UsuarioLimitDto } from '../../dtos/usuario/usuario.dto';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Usuarios')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Get()
	// @Public()
	// @Roles(Role.ADMIN)
	@ApiOperation({ summary: 'Obtener Todos los Usuarios' })
	async findAll(@Query() query: UsuarioLimitDto) {
		const usuarios = await this.usuariosService.findAll(query);
		return customResponse('usuarios', usuarios);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un Usuario' })
	async findOne(@Param('id') id: number) {
		const usuario = await this.usuariosService.findOne(id);
		return customResponse('usuario', usuario);
	}

	@Post()
	@Public()
	@ApiOperation({ summary: 'Crear un Usuario' })
	async create(@Body() body: UsuarioDto) {
		const usuarioCreated = await this.usuariosService.create(body);
		return customResponse('usuario', usuarioCreated);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un Usuario' })
	async update(@Param('id') id: number, @Body() body: UpdateUsuarioDto) {
		const updatedFamilia = await this.usuariosService.update(id, body);

		return customResponse('usuario actualizado', updatedFamilia);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un Usuario',
	})
	async delete(@Param('id') id: number) {
		const deleteResult = await this.usuariosService.delete(id);
		if (deleteResult.affected > 0) {
			return customResponse('usuario eliminado');
		}
		throw new NotFoundException('usuario no encontrado');
	}
}
