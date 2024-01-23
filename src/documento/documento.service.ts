import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Documento } from './entities/documento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
export class DocumentoService {
  
  constructor(
    @InjectRepository(Documento) private documentoRepository: Repository<Documento>,
  ){}

  async create(createDocumentoDto: CreateDocumentoDto) {
    
    //console.log(createDocumentoDto.numeroDni);
    const documentoFound = await this.documentoRepository.findOneBy({numeroDni: createDocumentoDto.numeroDni});
    //
    //if(documentoFound){
    //  throw new HttpException('Documento already exists', 409);
    //}
//
    //const newDocumento = await this.documentoRepository.save(createDocumentoDto);
//
    //return newDocumento;
    
    return "This action adds a new documento";
    
  }

  findAll() {
    return `This action returns all documento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
