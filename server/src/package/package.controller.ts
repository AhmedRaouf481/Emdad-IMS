import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { handleError } from '@/shared/http-error';
import { CreatePackageOnlyDto } from './dto/create-package-only.dto';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  // @Post()
  // async create(@Body() createPackageDto: CreatePackageDto) {
  //   try {
  //     return await this.packageService.create(createPackageDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  // @Post('only')
  // async createOnly(@Body() createPackageOnlyDto: CreatePackageOnlyDto) {
  //   try {
  //     return await this.packageService.createOnly(createPackageOnlyDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  @Get()
  async findAll() {
    try {
      return await this.packageService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.packageService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    try {
      return await this.packageService.update(id, updatePackageDto);
    }
    catch (error) {
      throw handleError(error);
    }
  }

  @Delete()
  async removeAll() {
    try {
      return await this.packageService.removeAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.packageService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
