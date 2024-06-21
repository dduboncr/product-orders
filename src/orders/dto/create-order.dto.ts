import { IsString, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsArray()
  products: string[];
}
