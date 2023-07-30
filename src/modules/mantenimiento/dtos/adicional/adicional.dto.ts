import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdicionalDto {
	@IsString()
	@ApiProperty()
	nombre: string;

	@IsString()
	@ApiProperty()
	precio_hora: string;
}

export class UpdateAdicionalDto extends PartialType(AdicionalDto) {}
