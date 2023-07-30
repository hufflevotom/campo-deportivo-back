import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deporte } from '../../entities/deporte/deporte.entity';
import { ILike, Like, Repository } from 'typeorm';
import { LimitDto } from '../../../database/dtos/limit.dto';
import { CampoDeporteDto, UpdateCampoDeporteDto } from '../../dtos/campo-deporte/campo-deporte.dto';
import { CampoDeportivo } from '../../entities/campo-deportivo/campo-deportivo.entity';
import { ImagenCampo } from '../../entities/campo-deportivo/imagen-campo.entity';

@Injectable()
export class CampoDeportivoService {
	constructor(
		@InjectRepository(CampoDeportivo) private readonly campoRepository: Repository<CampoDeportivo>,
	) {}

	findAll(limit: LimitDto) {
		limit.search = limit.search ? limit.search : '';

		return this.campoRepository.find({
			skip: limit.skip,
			take: limit.take,
			where: [
				{
					descripcion: Like(`%${limit.search}%`),
				},
				{
					alias: Like(`%${limit.search}%`),
				},
			],
		});
	}

	findOne(id: number) {
		return this.campoRepository.findOne({
			relations: ['imagenesCampo', 'deportes'],
			where: {
				id,
			},
		});
	}

	async create(campoDeportivoDto: CampoDeporteDto) {
		const campodeportivoDB = await this.campoRepository.findOne({
			where: {
				alias: ILike(campoDeportivoDto.alias),
			},
			withDeleted: true,
		});

		let campodeportivo: CampoDeportivo;

		if (campodeportivoDB) {
			campodeportivo = campodeportivoDB;
			campodeportivo.descripcion = campodeportivoDB.descripcion;
			campodeportivo.alias = campodeportivoDB.alias;
			campodeportivo.titulo = campodeportivoDB.titulo;
			campodeportivo.eventos = campodeportivoDB.eventos;
		} else {
			campodeportivo = this.campoRepository.create(campoDeportivoDto);
		}

		const deporte = new Deporte();
		deporte.id = campoDeportivoDto.deporteId;
		campodeportivo.deportes = [deporte];

		return this.campoRepository.save(campodeportivo);
	}

	async update(id: number, campoDeportivoDto: UpdateCampoDeporteDto) {
		const campoDeportivo = await this.campoRepository.findOne({
			where: {
				id,
			},
		});

		if (!campoDeportivo) {
			throw new NotFoundException('Campo deportivo no encontrado');
		}

		if (campoDeportivoDto.deporteId) {
			const deporte = new Deporte();
			deporte.id = campoDeportivoDto.deporteId;
			campoDeportivo.deportes = [deporte];
		}

		return this.campoRepository.save(campoDeportivo);
	}

	async uploadImage(campoDeportivoId: number, path: string) {
		const campoDeportivo = await this.campoRepository.findOne({
			relations: ['imagenesCampo'],
			where: {
				id: campoDeportivoId,
			},
		});

		const imagenCampo = new ImagenCampo();
		imagenCampo.imagenUrl = path;

		campoDeportivo.imagenesCampo.push(imagenCampo);

		return this.campoRepository.save(campoDeportivo);
	}

	delete(id: number) {
		return this.campoRepository.softDelete(id);
	}
}
