import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { MantenimientoModule } from './modules/mantenimiento/mantenimiento.module';
import { ReservaModule } from './modules/reserva/reserva.module';

export function generateDocumentacion(app) {
	// DOCUMENTACION PARA MODULO AUTH
	const authMod = new DocumentBuilder()
		.setTitle('Auth')
		.setDescription(process.env.APP_DESCRIPTION)
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();

	const authDocument = SwaggerModule.createDocument(app, authMod, {
		include: [AuthModule],
	});
	SwaggerModule.setup('docs/auth', app, authDocument);

	// DOCUMENTACION PARA MODULO MANTENIMIENTO
	const mantenimientoMod = new DocumentBuilder()
		.setTitle('Mantenimiento')
		.setDescription(process.env.APP_DESCRIPTION)
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();

	const mantenimientoDocument = SwaggerModule.createDocument(app, mantenimientoMod, {
		include: [MantenimientoModule],
	});
	SwaggerModule.setup('docs/mantenimiento', app, mantenimientoDocument);

	// DOCUMENTACION PARA MODULO RESERVA
	const reservaMod = new DocumentBuilder()
		.setTitle('Reserva')
		.setDescription(process.env.APP_DESCRIPTION)
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();

	const reservaDocument = SwaggerModule.createDocument(app, reservaMod, {
		include: [ReservaModule],
	});
	SwaggerModule.setup('docs/reserva', app, reservaDocument);
}
