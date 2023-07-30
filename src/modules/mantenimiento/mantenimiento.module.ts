import { Module } from '@nestjs/common';
import { CampoDeportivoController } from './controllers/campo-deportivo/campo-deportivo.controller';
import { CampoDeportivoService } from './services/campo-deportivo/campo-deportivo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deporte } from './entities/deporte/deporte.entity';
import { CampoDeportivo } from './entities/campo-deportivo/campo-deportivo.entity';
import { ImagenCampo } from './entities/campo-deportivo/imagen-campo.entity';
import { DeporteController } from './controllers/deporte/deporte.controller';
import { DeporteService } from './services/deporte/deporte.service';
import { Adicional } from './entities/adicional/adicional.entity';
import { TipoReserva } from './entities/tipo-reserva/tipo-reserva.entity';
import { AdicionalController } from './controllers/adicional/adicional.controller';
import { TipoReservaController } from './controllers/tipo-reserva/tipo-reserva.controller';
import { AdicionalService } from './services/adicional/adicional.service';
import { TipoReservaService } from './services/tipo-reserva/tipo-reserva.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Deporte, CampoDeportivo, ImagenCampo, Adicional, TipoReserva]),
	],
	controllers: [
		CampoDeportivoController,
		DeporteController,
		AdicionalController,
		TipoReservaController,
	],
	providers: [CampoDeportivoService, DeporteService, AdicionalService, TipoReservaService],
})
export class MantenimientoModule {}
