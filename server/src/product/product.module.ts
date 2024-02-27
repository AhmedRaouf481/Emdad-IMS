import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';
import { ProductRepo } from './product.repo';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo],
})
export class ProductModule { }
