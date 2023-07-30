import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTRegistroStrategy } from './strategies/jwt-registro.strategy';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';
import { ModulosService } from './services/modulos/modulos.service';
import { ModulosController } from './controllers/modulos/modulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol/rol.entity';
import { Modulo } from './entities/modulo/modulo.entity';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { Usuario } from './entities/usuario/usuario.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Rol, Modulo, Usuario]),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigType<typeof config>) => ({
				secret: configService.jwt_secret,
				signOptions: { expiresIn: '10d' },
			}),
			inject: [config.KEY],
		}),
		PassportModule,
	],
	providers: [
		AuthService,
		LocalStrategy,
		JWTStrategy,
		JWTRegistroStrategy,
		RolesService,
		ModulosService,
		UsuariosService,
	],
	controllers: [AuthController, RolesController, ModulosController, UsuariosController],
	exports: [RolesService],
})
export class AuthModule {}
