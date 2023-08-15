import { ApiProperty } from '@nestjs/swagger';
import { InventoryDTO } from './inventoryDTO';

export class ProductRequest {
  @ApiProperty()
  sku: string;
  name: string;
  inventory: InventoryDTO;
}
