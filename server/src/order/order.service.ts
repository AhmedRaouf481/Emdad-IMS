import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepo } from './order.repo';

@Injectable()
export class OrderService {
  constructor(private orderRepo: OrderRepo) { }

  // async create(createOrderDto: CreateOrderDto) {
  //   try {
  //     const pkg = await this.orderRepo.createPkgWithItems(createOrderDto)
  //     return pkg
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // async createOnly(createOrderDto: CreateOrderOnlyDto) {
  //   try {
  //     const pkg = await this.orderRepo.create(createOrderDto)
  //     return pkg
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async findAll() {
    try {
      const pkg = await this.orderRepo.getAll()
      return pkg
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const pkg = await this.orderRepo.getByID(id)
      return pkg
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const pkg = await this.orderRepo.update(id, updateOrderDto)
      return pkg
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const pkg = await this.orderRepo.delete(id)
      return pkg
    } catch (error) {
      throw error
    }
  }
}
