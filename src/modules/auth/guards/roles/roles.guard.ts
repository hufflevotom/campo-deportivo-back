import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../models/roles.model';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflactor: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflactor.get<Role[]>(ROLES_KEY, context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user as PayloadToken;

		const isValid = roles.some(role => user.role === role);
		if (!isValid) {
			throw new UnauthorizedException('Usuario no autorizado');
		}
		return true;
	}
}
