import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageRepo } from './package.repo';
import { CreatePackageOnlyDto } from './dto/create-package-only.dto';

@Injectable()
export class PackageService {
  constructor(private packageRepo: PackageRepo) { }

  // async create(createPackageDto: CreatePackageDto) {
  //   try {
  //     const pkg = await this.packageRepo.createPkgWithItems(createPackageDto)
  //     return pkg
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // async createOnly(createPackageDto: CreatePackageOnlyDto) {
  //   try {
  //     const pkg = await this.packageRepo.create(createPackageDto)
  //     return pkg
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async findAll() {
    try {
      const pkg = await this.packageRepo.getAll()
      return pkg
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const pkg = await this.packageRepo.getByID(id)
      return pkg
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    try {
      const pkg = await this.packageRepo.update(id, updatePackageDto)
      return pkg
    } catch (error) {
      throw error
    }
  }

  async removeAll() {
    try {
      const pkg = await this.packageRepo.deleteAll()
      return pkg
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const pkg = await this.packageRepo.delete(id)
      return pkg
    } catch (error) {
      throw error
    }
  }
}
