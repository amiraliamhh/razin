import { Controller, UseGuards, Get, Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from 'src/authentication/auth.guard';
import { IDatabaseOperationResponse } from 'src/app.interface';
import { ManageProductsService } from './manage-products.service';
import { ProductEntity, ProductEntityManual } from 'src/product/product.entity';
import { Roles } from 'src/authentication/auth.decorator';

@Controller("admin/products")
@UseGuards(AuthGuard)
export class ManageProductsController {
    constructor(
        private readonly manageProductsService: ManageProductsService,
    ) {}

    @Post("/create")
    @Roles("admin")
    async createProduct(@Req() req: Request): Promise<IDatabaseOperationResponse<{}>> {
        const body = <ProductEntityManual>req.body;
        
        return this.manageProductsService.createNewProduct(body);
    }

    @Get("/:id")
    @Roles("admin")
    getProductById(@Param() param: { id: string }): Promise<IDatabaseOperationResponse<ProductEntity>> {
        return this.manageProductsService.getProductById(param.id);
    }

    @Get()
    @Roles("admin")
    async getAllProducts(): Promise<IDatabaseOperationResponse<ProductEntity[]>> {
        return this.manageProductsService.getAllProducts();
    }
}
