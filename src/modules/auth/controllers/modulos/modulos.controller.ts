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
import { ModulosDto, ModulosLimitDto, UpdateModulosDto } from '../../dtos/modulos/modulos.dto';
import { ModulosService } from '../../services/modulos/modulos.service';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';

@ApiTags('Modulos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/modulos')
export class ModulosController {
	constructor(private readonly modulosService: ModulosService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todos los modulos',
	})
	async findAll(@Query() query: ModulosLimitDto) {
		const modulos = await this.modulosService.findAll(query);
		return customResponse('modulos', modulos);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener un modulo por ID',
	})
	async findOne(@Param('id') id: number) {
		const modulo = await this.modulosService.findOne(id);
		return customResponse('modulo', modulo);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear un modulo',
	})
	async create(@Body() body: ModulosDto) {
		const newFamiliaMod = await this.modulosService.create(body);
		return customResponse('modulo creada', newFamiliaMod, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar un modulo',
	})
	async update(@Param('id') id: number, @Body() body: UpdateModulosDto) {
		const updatedmod = await this.modulosService.update(id, body);
		if (updatedmod.affected > 0) {
			return customResponse('modulo actualizado');
		}
		throw new NotFoundException('modulo no encontrado');
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un modulo',
	})
	async delete(@Param('id') id: number) {
		const deleteResult = await this.modulosService.delete(id);
		if (deleteResult.affected > 0) {
			return customResponse('modulo eliminado');
		}
		throw new NotFoundException('modulo no encontrado');
	}
}
