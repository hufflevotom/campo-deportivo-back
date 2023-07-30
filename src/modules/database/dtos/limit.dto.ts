import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LimitDto {
	@IsNumber()
	@ApiProperty()
	take: number;

	@IsNumber()
	@ApiProperty()
	skip: number;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	search?: string;
}
