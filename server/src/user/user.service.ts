import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {

  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userRepo.create(createUserDto)
      return newUser
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepo.getAll()
      return users
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepo.getByID(id)
      return user
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.update(id, updateUserDto)
      return user
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.userRepo.delete(id)
      return { message: "Deleted successfully" }
    } catch (error) {
      throw error;
    }
  }
}
