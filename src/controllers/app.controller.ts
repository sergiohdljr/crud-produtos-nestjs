import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { Product } from '@prisma/client';
import { ProductRequest } from '../dto/product.resquestDTO';
import { updateProductType } from 'src/dto/update/updateProductDTO';

@Controller('api/product')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:sku')
  async findProductBySku(
    @Param('sku') sku: string,
  ): Promise<Product | HttpException> {
    return this.productService.findBySku(sku);
  }

  @Post('/create')
  async saveProduct(@Body() postProduct: ProductRequest): Promise<Product> {
    return this.productService.createUser(postProduct);
  }

  @Delete('/:sku')
  async deleteProductBySku(@Param('sku') sku: string) {
    this.productService.deleteBySku(sku);
  }

  @Put('/:sku')
  async editProductBySku(
    @Body() product: updateProductType,
    @Param('sku') sku: string,
  ) {
    return this.productService.editProductBySku(sku, product);
  }
}
