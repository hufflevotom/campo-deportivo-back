import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config/config';
import { UsuariosService } from 'src/modules/auth/services/usuarios/usuarios.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JWTRegistroStrategy extends PassportStrategy(Strategy, 'jwt-registro') {
	constructor(
		@Inject(config.KEY) configService: ConfigType<typeof config>,
		private usuariosService: UsuariosService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
			ignoreExpiration: false,
			secretOrKey: configService.jwt_secret,
		});
	}

	async validate(payload: PayloadToken) {
		const usuario = await this.usuariosService.findOne(payload.sub);
		return usuario;
	}
}
