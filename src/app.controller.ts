import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductRequest } from './dto/resquestDTO';

@Controller('api/product')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:sku')
  async findProductBySku(@Param('sku') sku: string): Promise<Product> {
    return this.productService.findBySku(sku);
  }

  @Post('/create')
  async saveProduct(@Body() postProduct: ProductRequest): Promise<Product> {
    return this.productService.createUser(postProduct);
  }
}
