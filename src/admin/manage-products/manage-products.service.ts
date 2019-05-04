import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductEntityManual } from 'src/product/product.entity';
import { errorFactory } from 'src/utils/error';
import { IDatabaseOperationResponse } from 'src/app.interface';

@Injectable()
export class ManageProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>
    ) {}

    async getAllProducts(): Promise<IDatabaseOperationResponse<ProductEntity[]>> {
        try {
            const products = await this.productEntity.find({});

            return {
                data: products,
                err: false,
            }
        } catch (e) {
            return errorFactory(e, "error while reading products.");
        }
    }

    async createNewProduct(product: ProductEntityManual): Promise<IDatabaseOperationResponse<{}>> {
        try {
            await this.productEntity.insert(product);
            
            return {
                err: false,
            };
        } catch (e) {
            return errorFactory(e, "error while creating new product.");
        }
    }
}
