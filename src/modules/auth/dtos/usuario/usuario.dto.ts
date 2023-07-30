import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UsuarioDto {
	@IsString()
	@ApiProperty()
	nombres: string;

	@IsString()
	@ApiProperty()
	apellidos: string;

	@IsEmail()
	@ApiProperty()
	email: string;

	@IsString()
	@ApiProperty()
	password: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	dni?: string;

	@IsNumber()
	@ApiProperty()
	rolId: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ required: false })
	celular: number;
}

export class UsuarioLimitDto {
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

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
