import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {

  constructor(
    //inject repository user
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>, // Asegúrate de tener el repo de Role inyectado
  ){}

  async create(createUserDto: CreateUserDto) {
    
    //find user by username
    const userFoundUsername = await this.userRepository.findOneBy({username: createUserDto.username});
    //return exception if user found
    if(userFoundUsername){
      throw new HttpException('Username already exists', 409);
    }

    const userFoundEmail = await this.userRepository.findOneBy({email: createUserDto.email});
    if(userFoundEmail){
      throw new HttpException('Email already exists', 409);
    }

    //hash password
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userRepository.save(createUserDto);

    //role user by default
    const userRole = await this.roleRepository.findOne({ where: { name: 'user' } });
    if (!userRole) {
      console.error('Role user dont exist. You must create it before continue.');
      return new HttpException('Role user dont exist. You must create it before continue.', 500);
    }
    newUser.roles = [userRole];

    await this.userRepository.save(newUser);

    return newUser;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email});
  }
  
  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({username});
  }

  async findOneByUsernameWithPassword(username: string) {
    return await this.userRepository.findOne({
      where: {username}, 
      select: ['id', 'username', 'password'],
    });
  }
  
  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {id}, 
      select: ['id', 'username', 'email', 'isActive'],
      relations: ['roles'], // Indicar la relación de roles
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  
}
