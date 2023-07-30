// import { Controller } from '@nestjs/common';

// @Controller('campo-deportivo')
// export class CampoDeportivoController {}

import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { customResponse } from '../../../../common/reponse';
// import { DeporteDto, UpdateDeporteDto } from '../../dtos/deporte/deporte.dto';
import { CampoDeportivoService } from '../../services/campo-deportivo/campo-deportivo.service';
import { CampoDeporteDto, UpdateCampoDeporteDto } from '../../dtos/campo-deporte/campo-deporte.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { constantes } from '../../../../common/constantes';
import { ImagenCampoDto } from '../../dtos/campo-deporte/imagenes-campo.dto';
import { pathFile } from '../../../../utils/pathfile';

@Controller('mantenimiento/campoDeportivo')
@ApiTags('Campo deportivo')
export class CampoDeportivoController {
	constructor(private readonly campoService: CampoDeportivoService) {}

	@Get()
	@ApiOperation({ summary: 'Traer todos los campoDeportivos' })
	async findAll(@Query() limit: LimitDto) {
		const campos = await this.campoService.findAll(limit);
		// console.log(campos);

		return customResponse('Campo Deportivo', campos);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Traer un campoDeportivo por id' })
	async findOne(@Param('id') id: number) {
		const campo = await this.campoService.findOne(id);
		return customResponse('Campo Deportivo', campo);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un campoDeportivo' })
	async create(@Body() campoDeportivoDto: CampoDeporteDto) {
		const campo = await this.campoService.create(campoDeportivoDto);
		return customResponse('Campo Deportivo', campo);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un campo deportivo' })
	async update(@Param('id') id: number, @Body() campoDeportivoDto: UpdateCampoDeporteDto) {
		await this.campoService.update(id, campoDeportivoDto);
		return customResponse('Deporte', 'Deporte actualizado correctamente');
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un campo deportivo' })
	async delete(@Param('id') id: number) {
		const deporte = await this.campoService.delete(id);
		if (deporte.affected > 0) {
			return customResponse('Deporte', 'Deporte eliminado correctamente');
		}
		throw new NotFoundException('No se encontro el deporte');
	}

	@Put('/imagen/:campoDeportivoId')
	@ApiOperation({ summary: 'Subir imagen de un CampoDeportivo' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('imagen', { dest: constantes.pathFile + 'imagenes-campos' }))
	@ApiBody({ type: ImagenCampoDto })
	async uploadImage(
		@Param('campoDeportivoId') campoDeportivoId: number,
		@UploadedFile() imagen: Express.Multer.File,
	) {
		const path = pathFile(imagen);

		const imagenCampo = await this.campoService.uploadImage(campoDeportivoId, path);
		return customResponse('Imagen Campo', imagenCampo);
	}
}
