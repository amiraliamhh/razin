import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';

@Module({
    imports: [],
    providers: [],
    controllers: [
        OrderController,
    ],
})
export class OrderModule {}
