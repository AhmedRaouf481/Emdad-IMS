import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemRepo } from './item.repo';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepo],
})
export class ItemModule { }
