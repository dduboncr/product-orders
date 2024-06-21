import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './mongoose/mongoose.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
