import { InventoryDTO } from './inventoryDTO';

export interface ProductRequest {
  sku: string;
  name: string;
  inventory: InventoryDTO;
  isMarkatable: boolean;
}
