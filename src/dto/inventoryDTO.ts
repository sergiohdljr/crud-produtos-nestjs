import { warehouseDTO } from './warehouseDTO';

export interface InventoryDTO {
  quantity: number;
  warehouses: warehouseDTO[];
}
