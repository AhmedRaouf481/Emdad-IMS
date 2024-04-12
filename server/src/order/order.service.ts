import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepo } from './order.repo';

@Injectable()
export class OrderService {
  constructor(private orderRepo: OrderRepo) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      if (!createOrderDto.client && !createOrderDto.clientId) {
        throw new BadRequestException("No client specified")
      }
      const order = await this.orderRepo.create_order(createOrderDto)
      return order
    } catch (error) {
      throw error
    }
  }

  // async createOnly(createOrderDto: CreateOrderOnlyDto) {
  //   try {
  //     const order = await this.orderRepo.create(createOrderDto)
  //     return order
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async findAll(query) {
    try {
      const order = await this.orderRepo.getAllPaginated(query)
      return order
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepo.getByID(id)
      return order
    } catch (error) {
      throw error
    }
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto) {
  //   try {
  //     const order = await this.orderRepo.update(id, updateOrderDto)
  //     return order
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async remove(id: string) {
    try {
      const order = await this.orderRepo.delete(id)
      return order
    } catch (error) {
      throw error
    }
  }
}
