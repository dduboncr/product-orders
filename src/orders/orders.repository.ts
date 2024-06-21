import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(order: Partial<Order>): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return newOrder.save();
  }

  async findAll(query: FilterQuery<Order>): Promise<Order[]> {
    return this.orderModel.find(query).populate('products').exec();
  }

  async findOneById(id: string): Promise<Order> {
    return this.orderModel.findById(id).populate('products').exec();
  }

  async update(id: string, update: Partial<Order>): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, { ...update }, { new: true })
      .exec();
  }
}
