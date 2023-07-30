import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ModulosDto {
	@IsString()
	@ApiProperty()
	nombre: string;
}

export class ModulosLimitDto {
	@IsNumber()
	@ApiProperty()
	limit: number;

	@IsNumber()
	@ApiProperty()
	offset: number;

	@IsOptional()
	@ApiProperty({ required: false })
	busqueda: string;
}

export class UpdateModulosDto extends PartialType(ModulosDto) {}
