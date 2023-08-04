import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRequest } from '../dto/product.resquestDTO';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      select: {
        sku: true,
        name: true,
        inventory: {
          select: {
            quantity: true,
            warehouses: {
              select: {
                locality: true,
                quantity: true,
                type: true,
              },
            },
          },
        },
        isMarkatable: true,
      },
    });
  }

  async findBySku(sku: string) {
    const searchBySku = this.prisma.product.findUnique({
      where: {
        sku,
      },
      include: {
        inventory: {
          include: {
            warehouses: true,
          },
        },
      },
    });

    return searchBySku;
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
