import { ApiProperty } from '@nestjs/swagger';
import { warehouseDTO } from './warehouseDTO';

export class InventoryDTO {
  @ApiProperty()
  id: number;
  warehouses: warehouseDTO[];
}
