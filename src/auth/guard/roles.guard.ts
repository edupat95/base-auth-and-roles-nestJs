import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY,
      [
        context.getHandler(),
        context.getClass()
      ]); // permite obtener los roles de los metadatos de la clase o del metodo

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();  

    //console.log('ROLES:', roles);
    //console.log('USER:', user);

    if (!user || !user.roles || user.roles.length === 0) {
      console.log('NO TIENE ROLES', user);
      return false; // El usuario no tiene roles, denegar el acceso
    }

    console.log('TIENE ROLES', user.roles);
    console.log('NECESITA ROLES', roles);

    //Si user.roles tiene 'admin' retorna true
    if(user.roles.includes('admin')){
      return true;
    }

    //Si user.roles coicide con alguno de los roles retorna true
    return roles.some((role: string) => user.roles.includes(role));
    
  }
}
