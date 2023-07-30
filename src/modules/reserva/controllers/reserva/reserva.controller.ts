import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { customResponse } from '../../../../common/reponse';
import { ReservaService } from '../../services/reserva/reserva.service';
import { ReservaDto, UpdateReservaDto } from '../../dtos/reserva/reserva.dto';
import { LimitDto } from '../../../database/dtos/limit.dto';

@Controller('reserva/reserva')
@ApiTags('Reserva')
export class ReservaController {
	constructor(private readonly reservaService: ReservaService) {}

	@Get()
	@ApiOperation({ summary: 'Traer todas la reservas' })
	async findAll(@Query() query: LimitDto) {
		const reservas = await this.reservaService.findAll(query);
		return customResponse('Reservas', reservas);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Traer un deporte por id' })
	async findOne(@Param('id') id: number) {
		const deporte = await this.reservaService.findOne(id);
		return customResponse('Deporte', deporte);
	}

	@Post()
	@ApiOperation({ summary: 'Crear una reserva' })
	async create(@Body() reservaDto: ReservaDto) {
		const deporte = await this.reservaService.create(reservaDto);
		return customResponse('Reserva', deporte);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar una reserva' })
	async update(@Param('id') id: number, @Body() reservaDto: UpdateReservaDto) {
		await this.reservaService.update(id, reservaDto);
		return customResponse('Reserva', 'Reserva actualizado correctamente');
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un reserva' })
	async delete(@Param('id') id: number) {
		const deporte = await this.reservaService.delete(id);
		if (deporte.affected > 0) {
			return customResponse('Reserva', 'Reserva eliminado correctamente');
		}
		throw new NotFoundException('No se encontro el deporte');
	}
}
