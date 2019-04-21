import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateOrderPayload } from './order.interface';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>
    ) {}

    async createOrder(order: ICreateOrderPayload): Promise<IDatabaseOperationResponse> {
        try {
            await this.orderEntity.insert(order);
            return { err: false };
        } catch(e) {
            console.error(e);
        }
    }
}