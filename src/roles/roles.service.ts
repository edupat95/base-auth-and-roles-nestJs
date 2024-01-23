import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {

  constructor(
    //inject repository user
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async findByName(name: string){
    const existingRole = await this.roleRepository.findOne({ where: { name } });

    if (!existingRole) {
      console.error(`El rol "${name}" no existe. Debe crearlo antes de continuar.`);
    }

    return existingRole;
  }

  async createDefaultRoles() {
    try {
      const existingRole = await this.roleRepository.findOne({ where: { name: 'user' } });
      const existingRoleAdmin = await this.roleRepository.findOne({ where: { name: 'admin' } });
      
      // Si no existe, crea el rol 'user'
      if (!existingRole) {
        const newUserRole = this.roleRepository.create({ name: 'user' });

        await this.roleRepository.save(newUserRole);
        console.log('Default role "user" created successfully.');
      } else {
        console.log('The role "user" already exists.');
      }

      // Si no existe, crea el rol 'admin'
      if (!existingRoleAdmin) {
        const newAdminRole = this.roleRepository.create({ name: 'admin' });
        await this.roleRepository.save(newAdminRole);
        console.log('Default role "admin" created successfully.');
      } else {
        console.log('The role "admin" already exists.');
      }

    } catch (error) {
      console.error('Error try create rol:', error);
    }
  }
  
}
