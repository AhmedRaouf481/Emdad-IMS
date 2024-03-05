import { Injectable } from '@nestjs/common';
import { ClientRepo } from './client.repo';
import * as exceljs from 'exceljs'
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private clientRepo: ClientRepo) {

  }
  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientRepo.create(createClientDto)
      return client
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const client = await this.clientRepo.getAll()
      return client
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clientRepo.getByID(id)
      return client
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.clientRepo.update(id, updateClientDto)
      return client
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const client = await this.clientRepo.delete(id)
      return client
    } catch (error) {
      throw error
    }
  }
}
