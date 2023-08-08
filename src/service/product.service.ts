import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    const ProductSearchBySku = await this.prisma.product.findUnique({
      where: {
        sku,
      },
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

    if (!ProductSearchBySku) {
      throw new HttpException(
        `Produto com o sku igual a ${sku} não foi encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return ProductSearchBySku;
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

    const productAlreadyExists = await this.prisma.product.findUnique({
      where: {
        sku,
      },
    });

    if (productAlreadyExists) {
      throw new HttpException(
        `Produto com o sku igual a ${sku} já existe`,
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.product.create({
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

  async deleteBySku(sku: string) {
    const deleteBySku = await this.prisma.product.delete({
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

    if (!deleteBySku) {
      throw new HttpException(
        `Produto com o sku igual a ${sku} não foi encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
