import { warehouseDTO } from './warehouseDTO';

export interface InventoryDTO {
  id: number;
  warehouses: warehouseDTO[];
}
