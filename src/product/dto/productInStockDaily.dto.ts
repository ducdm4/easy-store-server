export class CreateProductInStockDto {
  product: {
    id: number;
  };
  date: string;
  quantity: number;
  type: number;
}
