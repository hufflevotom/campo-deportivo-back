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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { customResponse } from '../../../../common/reponse';
import { AdicionalService } from '../../services/adicional/adicional.service';
import { AdicionalDto, UpdateAdicionalDto } from '../../dtos/adicional/adicional.dto';

@Controller('mantenimiento/adicional')
@ApiTags('Adicional')
export class AdicionalController {
	constructor(private readonly adicionalService: AdicionalService) {}

	@Get()
	@ApiOperation({ summary: 'Traer todos los adicional' })
	async findAll(@Query() limit: LimitDto) {
		const adicionales = await this.adicionalService.findAll(limit);
		return customResponse('Adicionales', adicionales);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Traer un adicional por id' })
	async findOne(@Param('id') id: number) {
		const adicional = await this.adicionalService.findOne(id);
		return customResponse('Adicional', adicional);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un adicional' })
	async create(@Body() adicionalDto: AdicionalDto) {
		const adicional = await this.adicionalService.create(adicionalDto);
		return customResponse('Adicional', adicional);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un adicional' })
	async update(@Param('id') id: number, @Body() updateAdicionalDto: UpdateAdicionalDto) {
		const adicional = await this.adicionalService.update(id, updateAdicionalDto);
		if (adicional.affected > 0) {
			return customResponse('Adicional', 'Adicional actualizado correctamente');
		}
		throw new NotFoundException('No se encontro el adicional');
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un Adicional' })
	async delete(@Param('id') id: number) {
		const adicional = await this.adicionalService.delete(id);
		if (adicional.affected > 0) {
			return customResponse('Adicional', 'Adicional eliminado correctamente');
		}
		throw new NotFoundException('No se encontro el adicional');
	}
}
