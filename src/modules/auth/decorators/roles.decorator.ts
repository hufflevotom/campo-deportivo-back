import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/roles.model';

export const ROLES_KEY = 'roles';

export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
