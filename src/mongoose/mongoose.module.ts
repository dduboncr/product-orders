import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseConnectionService } from './mongoose.service';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL)],
  providers: [MongooseConnectionService],
})
export class DatabaseModule {}
