import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CampoDeporteDto {
	@IsString()
	@ApiProperty()
	alias: string;

	@IsString()
	@ApiProperty()
	titulo: string;

	@IsString()
	@ApiProperty()
	descripcion: string;

	@IsBoolean()
	@ApiProperty()
	eventos: boolean;

	@IsNumber()
	@ApiProperty()
	deporteId: number;
}

export class UpdateCampoDeporteDto extends PartialType(CampoDeporteDto) {}
