import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
