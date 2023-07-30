import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from 'src/modules/auth/entities/usuario/usuario.entity';
import { AuthDto } from '../../dtos/auth/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(AuthGuard('local'))
	@ApiBody({ type: AuthDto })
	login(@Req() req: Request) {
		const user = req.user as Usuario;
		return this.authService.generateJWT(user);
	}

	@Get('login/token')
	@UseGuards(AuthGuard('jwt-registro'))
	@ApiQuery({ name: 'token' })
	loginToken(@Req() req: Request) {
		const user = req.user as Usuario;
		return this.authService.generateJWT(user);
	}
}
