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
      inventory: { id, quantity, warehouses },
      isMarkatable,
    } = data;

    return this.prisma.product.create({
      data: {
        sku,
        name,
        inventory: {
          create: {
            id,
            quantity,
            warehouses: {
              create: warehouses.map((warehouse) => {
                return {
                  locality: warehouse.locality,
                  quantity: warehouse.quantity,
                  type: warehouse.type,
                };
              }),
            },
          },
        },
        isMarkatable,
      },
      include: {
        inventory: {
          include: {
            warehouses: true,
          },
        },
      },
    });
  }
}
