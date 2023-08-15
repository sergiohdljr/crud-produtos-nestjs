import { ApiProperty } from '@nestjs/swagger';

export class warehouseDTO {
  @ApiProperty()
  locality: string;
  quantity: number;
  type: 'ECOMMERCE' | 'PHYSICAL_STORE';
}
