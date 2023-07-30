import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class ReservaDto {
	@IsString()
	@ApiProperty()
	cliente_nombre: string;

	@IsString()
	@ApiProperty()
	cliente_dni: string;

	@IsString()
	@ApiProperty()
	cliente_alias: string;

	@IsString()
	@ApiProperty()
	cliente_celular: string;

	@IsNumber()
	@ApiProperty()
	tipoReservaId: number;

	@IsDateString()
	@ApiProperty()
	fecha_reserva: string;

	@IsString()
	@ApiProperty()
	hora_inicio: string;

	@IsString()
	@ApiProperty()
	hora_fin: string;

	@IsArray()
	@ApiProperty()
	adicionalesId: number[];
}

export class UpdateReservaDto extends PartialType(ReservaDto) {}
