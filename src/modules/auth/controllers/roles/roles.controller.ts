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
import { Public } from '../../decorators/public.decorator';
import { RolesDto, RolesLimitDto, UpdateRolesDto } from '../../dtos/roles/roles.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { RolesService } from '../../services/roles/roles.service';

@ApiTags('Roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('auth/roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Get()
	@Public()
	@ApiOperation({
		summary: 'Obtener todos los roles',
	})
	async findAll(@Query() query: RolesLimitDto) {
		const roles = await this.rolesService.findAllPagination(query);
		return customResponse('roles', roles);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener un rol por ID',
	})
	async findOne(@Param('id') id: number) {
		const rol = await this.rolesService.findOne(id);
		return customResponse('rol', rol);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear un rol',
	})
	async create(@Body() body: RolesDto) {
		const newFamiliaRol = await this.rolesService.create(body);
		return customResponse('rol creada', newFamiliaRol, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar un rol',
	})
	async update(@Param('id') id: number, @Body() body: UpdateRolesDto) {
		const updatedrol = await this.rolesService.update(id, body);

		return customResponse('rol actualizado', updatedrol);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un rol',
	})
	async delete(@Param('id') id: number) {
		const deleteResult = await this.rolesService.delete(id);
		if (deleteResult.affected > 0) {
			return customResponse('rol eliminado');
		}
		throw new NotFoundException('rol no encontrado');
	}
}
