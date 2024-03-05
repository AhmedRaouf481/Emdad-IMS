import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepo } from './client.repo';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClientController],
  providers: [ClientService, ClientRepo],
})
export class ClientModule { }
