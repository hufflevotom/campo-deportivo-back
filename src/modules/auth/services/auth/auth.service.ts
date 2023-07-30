import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/modules/auth/services/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/modules/auth/entities/usuario/usuario.entity';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class AuthService {
	constructor(
		private usuariosService: UsuariosService,
		private jwtService: JwtService,
	) {}
	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usuariosService.findUsuarioByEmail(email);
		if (user) {
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid) {
				return user;
			}
		}
		return null;
	}

	generateJWT(user: Usuario) {
		const payload: PayloadToken = { role: user.role.id.toString(), sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
