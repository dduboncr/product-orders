import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  private getTotalAmount(products: Product[]) {
    return products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }

  async create(createOrderDto: CreateOrderDto) {
    const products = await this.productsRepository.findAll({
      _id: { $in: createOrderDto.products },
    });

    if (products.length === 0) {
      this.logger.log('No products found');
    }

    const totalAmount = this.getTotalAmount(products);

    return this.ordersRepository.createOrder({
      customerName: createOrderDto.customerName,
      totalAmount,
      products: products,
    });
  }

  findAll() {
    return this.ordersRepository.findAll({});
  }

  findOne(id: string) {
    return this.ordersRepository.findOneById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOneById(id);

    if (!order) {
      this.logger.log('Order not found');
      throw new NotFoundException('Order not found');
    }

    if (updateOrderDto.products && updateOrderDto?.products.length > 0) {
      const products = await this.productsRepository.findAll({
        _id: { $in: (updateOrderDto.products || []).filter(Boolean) },
      });

      order.products.push(...products);

      // recalculate total amount
      order.totalAmount = this.getTotalAmount(order.products);
    }

    if (updateOrderDto.customerName) {
      order.customerName = updateOrderDto.customerName;
    }

    return this.ordersRepository.update(order._id.toString(), order);
  }

  async getTotalSoldPrice() {
    const lastMonth = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
    const orders = await this.ordersRepository.findAll({
      orderDate: { $gte: lastMonth },
    });

    const totalSoldPrice = orders.reduce((acc, order) => {
      return acc + order.totalAmount;
    }, 0);

    return { totalSoldPrice };
  }

  async getHighestAmountOrder() {
    const orders = await this.ordersRepository.findAll({});
    // sort orders by totalAmount in descending order
    orders.sort((a, b) => b.totalAmount - a.totalAmount);
    return orders[0];
  }
}
