import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';

export const initConfig = async (app) => {
  // Obtén una instancia del servicio RoleService
  const roleService = app.get(RolesService);
  // Ejecuta la función createDefaultRoles (admin and user)
  await roleService.createDefaultRoles();

  const roleAdmin = await roleService.findByName('admin');
  if (!roleAdmin) {
    console.error('Rol admin dont exist. You must create it before continue.');
  }
  // crear usuario admin admin por defecto
  const userService = app.get(UsersService);
  const userAdmin = await userService.findOneByUsername('admin');

  if (!userAdmin) {
    const adminUser = new User();
    adminUser.username = 'admin';
    adminUser.password = 'admin';
    adminUser.email = 'admin@example.com';
    adminUser.roles = [roleAdmin];
    await userService.create(adminUser);
    console.log('User admin created successfully.');
  } else {
    console.log('User admin already exists.');
  }

  return true;
};
