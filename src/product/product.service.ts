import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { IDatabaseOperationResponse } from 'src/app.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productEntity: Repository<ProductEntity>,
    ) {}

    async getAllProducts() {
        const products = await this.productEntity.find();
        return products;
    }

    async createProduct(product: ProductEntity): Promise<IDatabaseOperationResponse> {
        try {
            await this.productEntity.insert(product);
            return {
                err: false,
            };
        } catch (e) {
            return {
                err: true,
                msg: process.env.PRODUCTION ? 'error while inserting new product to database.' : e,
            };
        }
    }
}
