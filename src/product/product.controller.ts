import {
    Controller, 
    Get, 
    Post, 
    Req, 
    UseGuards, 
    Put, 
    Delete,
    Param, 
} from '@nestjs/common';
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

    @Get(':id')
    getOne(@Param() params: { id: string }): Promise<IDatabaseOperationResponse<ProductEntity>> {
        return this.productService.getProductById(params.id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Roles('admin')
    createProduct(@Req() req: Request): Promise<IDatabaseOperationResponse<{}>> {
        const body = (req.body as ProductEntity);
        return this.productService.createProduct(body);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    updateProduct(@Req() req: Request): Promise<IDatabaseOperationResponse<{}>> {
        const body = (req.body as ProductEntity);
        return this.productService.updateProduct(body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('admin')
    deleteProduct(@Param() params: { id: string }): Promise<IDatabaseOperationResponse<{}>> {
        return this.productService.deleteProduct(params.id);
    }
}
