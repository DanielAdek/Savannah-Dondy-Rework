import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
