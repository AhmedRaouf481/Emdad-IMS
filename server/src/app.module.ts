import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user/user.guard';
import { ItemModule } from './item/item.module';
import { PackageModule } from './package/package.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, ItemModule, PackageModule, ProductModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    AppService
  ],
})
export class AppModule { }
