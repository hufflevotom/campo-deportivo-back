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
} from '@nestjs/common';
import { DeporteService } from '../../services/deporte/deporte.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { customResponse } from '../../../../common/reponse';
import { DeporteDto, UpdateDeporteDto } from '../../dtos/deporte/deporte.dto';

@Controller('mantenimiento/deporte')
@ApiTags('Deporte')
export class DeporteController {
	constructor(private readonly deporteService: DeporteService) {}

	@Get()
	@ApiOperation({ summary: 'Traer todos los deportes' })
	async findAll(@Query() limit: LimitDto) {
		const deportes = await this.deporteService.findAll(limit);
		return customResponse('Deportes', deportes);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Traer un deporte por id' })
	async findOne(@Param('id') id: number) {
		const deporte = await this.deporteService.findOne(id);
		return customResponse('Deporte', deporte);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un deporte' })
	async create(@Body() deporteDto: DeporteDto) {
		const deporte = await this.deporteService.create(deporteDto);
		return customResponse('Deporte', deporte);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un deporte' })
	async update(@Param('id') id: number, @Body() deporteDto: UpdateDeporteDto) {
		const deporte = await this.deporteService.update(id, deporteDto);
		if (deporte.affected > 0) {
			return customResponse('Deporte', 'Deporte actualizado correctamente');
		}
		throw new NotFoundException('No se encontro el deporte');
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un deporte' })
	async delete(@Param('id') id: number) {
		const deporte = await this.deporteService.delete(id);
		if (deporte.affected > 0) {
			return customResponse('Deporte', 'Deporte eliminado correctamente');
		}
		throw new NotFoundException('No se encontro el deporte');
	}
}
