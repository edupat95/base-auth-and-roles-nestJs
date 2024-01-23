import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/entities/role.entity';


export const ROLES_KEY = 'roles';

export const Roles = (roles: string[]) => SetMetadata(ROLES_KEY, roles); 
