import { Controller, Get, Body, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ICreateOrderPayload } from './order.interface';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('user/order')
@UseGuards(AuthGuard)
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @Get('all')
    getAllOrders() {
        return { success: true };
    }

    @Post('new')
    newOrder(@Body() body: ICreateOrderPayload, @Req() req: any) {
        return this.orderService.createOrder(body);
    }
}
