import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRequest } from './dto/resquestDTO';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        inventory: {
          include: {
            warehouses: true,
          },
        },
      },
    });
  }

  async createUser(data: ProductRequest) {
    const {
      sku,
      name,
      inventory: { id, warehouses },
    } = data;

    const inventoryQuantity = warehouses
      .map((warehouse) => warehouse.quantity)
      .reduce((total, num) => total + num);

    const isMarkatableValue = inventoryQuantity > 0 ? true : false;

    return this.prisma.product.create({
      data: {
        sku,
        name,
        inventory: {
          create: {
            id,
            quantity: inventoryQuantity,
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
        isMarkatable: isMarkatableValue,
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
