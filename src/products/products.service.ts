import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.createProduct(createProductDto);
  }

  findAll() {
    return this.productsRepository.findAll({});
  }

  findOne(id: string) {
    return this.productsRepository.findOneById(id);
  }
}
