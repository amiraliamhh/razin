import { Controller, Get, } from '@nestjs/common';

@Controller('user/order')
export class OrderController {
    @Get('all')
    getAllOrders() {
        return { status: 1 };
    }
}
