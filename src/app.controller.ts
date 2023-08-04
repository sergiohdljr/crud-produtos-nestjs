import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductRequest } from './dto/resquestDTO';

@Controller('api/product')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create')
  async saveProduct(@Body() postProduct: ProductRequest): Promise<Product> {
    return this.productService.createUser(postProduct);
  }
}
