import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeporteDto {
	@IsString()
	@ApiProperty()
	nombre: string;

	@IsString()
	@ApiProperty()
	descripcion: string;

	@IsString()
	@ApiProperty()
	imagenUrl: string;
}

export class UpdateDeporteDto extends PartialType(DeporteDto) {}
