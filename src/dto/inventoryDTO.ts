import { warehouseDTO } from './warehouseDTO';

export interface InventoryDTO {
  id: number;
  quantity: number;
  warehouses: warehouseDTO[];
}
