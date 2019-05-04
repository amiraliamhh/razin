import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManageProductsService } from './manage-products.service';
import { ManageProductsController } from './manage-products.controller';
import { ProductEntity } from 'src/product/product.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
        ])
    ],
    providers: [
        ManageProductsService,
    ],
    controllers: [
        ManageProductsController,
    ]
})
export class ManageProductsModule {}
