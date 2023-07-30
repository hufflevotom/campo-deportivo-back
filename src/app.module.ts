import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';
import config, { validation } from './config/config';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MantenimientoModule } from './modules/mantenimiento/mantenimiento.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerMiddleware } from './utils/MiddlewareConsumer';
import { ReservaModule } from './modules/reserva/reserva.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath:
				process.env.TIPO === 'PROD' ? join(__dirname, 'public') : join(__dirname, '..', 'public'),
		}),
		ConfigModule.forRoot({
			// * Definimos que es global
			isGlobal: true,
			// * Definimos el archivo de configuracion
			envFilePath: '.env',
			// * Definimos el esquema y la validacion
			load: [config],
			validationSchema: Joi.object(validation),
		}),
		DatabaseModule,
		AuthModule,
		MantenimientoModule,
		ReservaModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
