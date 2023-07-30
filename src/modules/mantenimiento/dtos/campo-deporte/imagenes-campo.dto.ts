import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class ImagenCampoDto {
	@IsNotEmpty()
	@ApiProperty({ type: 'string', format: 'binary' })
	imagen: any;
}
