import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adicional } from '../mantenimiento/entities/adicional/adicional.entity';
import { Reserva } from './entities/reserva/reserva.entity';
import { TipoReserva } from '../mantenimiento/entities/tipo-reserva/tipo-reserva.entity';
import { ReservaController } from './controllers/reserva/reserva.controller';
import { ReservaService } from './services/reserva/reserva.service';

@Module({
	imports: [TypeOrmModule.forFeature([Adicional, Reserva, TipoReserva])],
	controllers: [ReservaController],
	providers: [ReservaService],
})
export class ReservaModule {}
