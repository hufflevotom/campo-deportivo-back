import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryLimitDto {
	@IsNumber()
	@ApiProperty()
	limit: number;

	@IsNumber()
	@ApiProperty()
	offset: number;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	busqueda?: string;
}
