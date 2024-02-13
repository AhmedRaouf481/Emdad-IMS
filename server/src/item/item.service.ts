import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepo } from './item.repo';

@Injectable()
export class ItemService {
  constructor(private itemRepo: ItemRepo) {

  }
  async create(createItemDto: CreateItemDto) {
    try {
      const item = await this.itemRepo.create(createItemDto)
      return item
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const item = await this.itemRepo.getAll()
      return item
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.itemRepo.getByID(id)
      return item
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const item = await this.itemRepo.update(id, updateItemDto)
      return item
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const item = await this.itemRepo.delete(id)
      return item
    } catch (error) {
      throw error
    }
  }
}
