import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GoodsModule } from './goods/goods.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    UsersModule,
    GoodsModule,
    EventsModule,
  ],
})
export class AppModule {}
