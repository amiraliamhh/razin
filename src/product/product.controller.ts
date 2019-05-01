import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { ProductService } from './product.service';
import { Roles } from 'src/authentication/auth.decorator';
import { AuthGuard } from 'src/authentication/auth.guard';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Get('all')
    getAll() {
        return this.productService.getAllProducts();
    }

    @Post()
    @UseGuards(AuthGuard)
    @Roles('admin')
    createProduct(@Req() req: Request): Promise<IDatabaseOperationResponse> {
        const body = (req.body as ProductEntity);
        return this.productService.createProduct(body);
    }
}
