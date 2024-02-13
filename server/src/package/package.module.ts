import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { PackageRepo } from './package.repo';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PackageController],
  providers: [PackageService, PackageRepo],
})
export class PackageModule { }
