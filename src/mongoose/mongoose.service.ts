import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongooseConnectionService implements OnModuleInit {
  private readonly logger = new Logger(MongooseConnectionService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.logger.log('connection to the database', process.env.MONGO_URL);
    this.connection.on('connected', () => {
      this.logger.log('Mongoose connected to the database');
    });

    this.connection.on('error', (err) => {
      this.logger.error('Mongoose connection error:', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('Mongoose disconnected from the database');
    });

    this.connection.on('reconnected', () => {
      this.logger.log('Mongoose reconnected to the database');
    });
  }
}
