import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { handleError } from '@/shared/http-error';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.create(createOrderDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  // @Post('only')
  // async createOnly(@Body() createOrderOnlyDto: CreateOrderOnlyDto) {
  //   try {
  //     return await this.orderService.createOnly(createOrderOnlyDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  @Get()
  async findAll(@Query() query) {
    try {
      return await this.orderService.findAll(query);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.orderService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   try {
  //     return await this.orderService.update(id, updateOrderDto);
  //   }
  //   catch (error) {
  //     throw handleError(error);
  //   }
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.orderService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
