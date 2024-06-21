import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private product: Model<Product>) {}

  createProduct(dto: CreateProductDto): Promise<Product> {
    const newProduct = new this.product(dto);
    return newProduct.save();
  }

  async findAll(query: FilterQuery<Product>): Promise<Product[]> {
    return this.product.find(query);
  }

  async findOneById(id: string): Promise<Product> {
    return this.product.findById(id).exec();
  }
}
