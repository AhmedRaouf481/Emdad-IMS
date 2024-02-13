import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { handleError } from '@/shared/http-error';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    try {
      return await this.itemService.create(createItemDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.itemService.findAll();
    } catch (error) {
      throw handleError(error);
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.itemService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    try {
      return await this.itemService.update(id, updateItemDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.itemService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
