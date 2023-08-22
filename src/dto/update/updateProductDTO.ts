import { ProductRequest } from '../product.resquestDTO';

export type updateProductType = Pick<ProductRequest, 'name' | 'inventory'>;
