import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { handleError } from '@/shared/http-error';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { memoryStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productService.create(createProductDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Post('import-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.includes('excel') && !file.mimetype.includes('spreadsheetml')) {
        return callback(new BadRequestException('Only Excel files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.productService.processImportedFile(file);
    } catch (error) {
      throw handleError(error);
    }
  }

  // @Public()
  @Get()
  async findAllPag(@Query() query) {
    try {
      return await this.productService.findAllPag(query);
    } catch (error) {
      throw handleError(error);
    }

  }

  @Public()
  @Get('all')
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw handleError(error);
    }

  }

  @Public()
  @Get('category')
  async findAllCategories() {
    try {
      return await this.productService.getAllCategories();
    } catch (error) {
      throw handleError(error);
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productService.update(id, updateProductDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete()
  async removeAll() {
    try {
      return await this.productService.removeMany();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
