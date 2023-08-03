import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRequest } from './dto/resquestDTO';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: ProductRequest) {
    const {
      sku,
      name,
      inventory: { quantity, warehouses },
      isMarkatable,
    } = data;

    return this.prisma.product.create({
      data: {
        sku,
        name,
        inventory: {
          connectOrCreate: {
            where: {
              productSku: sku,
            },
            create: {
              quantity,
            },
          },
        },
        isMarkatable,
      },
    });
  }
}
