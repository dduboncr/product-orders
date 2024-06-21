import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule, ProductsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
