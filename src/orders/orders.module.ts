import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema } from 'src/schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from 'src/products/products.repository';
import { OrdersRepository } from './orders.repository';
import { ProductSchema } from 'src/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [ProductsRepository, OrdersService, OrdersRepository],
})
export class OrdersModule {}
