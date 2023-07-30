import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class RolesDto {
	@IsString()
	@ApiProperty()
	nombre: string;

	@IsArray()
	@ApiProperty({ type: 'array', items: { type: 'number' } })
	modulosId: number[];
}

export class RolesLimitDto {
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

export class UpdateRolesDto extends PartialType(RolesDto) {}
