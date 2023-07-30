import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TipoReservaDto {
	@IsString()
	@ApiProperty()
	nombre: string;
}

export class UpdateTipoReservaDto extends PartialType(TipoReservaDto) {}
