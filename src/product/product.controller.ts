import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
    @Get('all')
    getAll() {
        return true;
    }
}