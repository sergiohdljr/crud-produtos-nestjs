import { Warehouses } from '@prisma/client';

export interface updatedProductType {
  sku: string;
  name: string;
  isMarkatable: boolean;
  inventory: Inventory;
}

export interface Inventory {
  id: number;
  quantity: number;
  productSku: string;
  warehouses: Warehouse[];
}

export interface Warehouse {
  id: number;
  locality: string;
  quantity: number;
  type: string;
  inventoryId: number;
}

export const serializationsUpdateProduct = (product: updatedProductType) => {
  const { sku, name, inventory, isMarkatable } = product;
  const warehouses = inventory.warehouses;

  const newProduct = {
    sku: sku,
    name: name,
    inventory: {
      quantity: inventory.quantity,
      warehouses: warehouses.map((warehouse) => {
        return {
          locality: warehouse.locality,
          quantity: warehouse.quantity,
          type: warehouse.type,
        };
      }),
    },
    isMarkatable: isMarkatable,
  };

  return newProduct;
};
