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
import { DeporteDto, UpdateDeporteDto } from '../../dtos/deporte/deporte.dto';
import { TipoReservaService } from '../../services/tipo-reserva/tipo-reserva.service';
import { TipoReservaDto, UpdateTipoReservaDto } from '../../dtos/tipo-reserva/tipo-reserva.dto';

@Controller('mantenimiento/tipoReserva')
@ApiTags('Tipo Reserva')
export class TipoReservaController {
	constructor(private readonly tipoReservaService: TipoReservaService) {}

	@Get()
	@ApiOperation({ summary: 'Traer todos los deportes' })
	async findAll(@Query() limit: LimitDto) {
		const tipoReservas = await this.tipoReservaService.findAll(limit);
		return customResponse('Tipo reservas', tipoReservas);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Traer un deporte por id' })
	async findOne(@Param('id') id: number) {
		const deporte = await this.tipoReservaService.findOne(id);
		return customResponse('Tipo reserva', deporte);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un deporte' })
	async create(@Body() tipoReservaDto: TipoReservaDto) {
		const tipoReserva = await this.tipoReservaService.create(tipoReservaDto);
		return customResponse('Tipo reserva', tipoReserva);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un deporte' })
	async update(@Param('id') id: number, @Body() updateTipoReservaDto: UpdateTipoReservaDto) {
		const tipoReserva = await this.tipoReservaService.update(id, updateTipoReservaDto);
		if (tipoReserva.affected > 0) {
			return customResponse('Tipo reserva', 'Tipo reserva actualizado correctamente');
		}
		throw new NotFoundException('No se encontro el tipo reserva');
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un deporte' })
	async delete(@Param('id') id: number) {
		const tipoReserva = await this.tipoReservaService.delete(id);
		if (tipoReserva.affected > 0) {
			return customResponse('Tipo reserva', 'Tipo reserva eliminado correctamente');
		}
		throw new NotFoundException('No se encontro el tipo reserva');
	}
}
