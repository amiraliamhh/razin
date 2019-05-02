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
        const products = await this.productEntity.find({ archived: false });
        return products;
    }

    async getProductById(id: string): Promise<IDatabaseOperationResponse> {
        const product = await this.productEntity.findOne({ id });
        return {
            data: product,
            err: false,
        };
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

    async updateProduct(product: ProductEntity): Promise<IDatabaseOperationResponse> {
        try {
            await this.productEntity.update(
                { id: product.id }, 
                this.validateProdcutObject(product));
            
            return {
                err: false,
            };

        } catch (e) {
            return {
                err: true,
                msg: process.env.PRODUCTION ? 'error while updating product.' : e,
            };
        }
    }

    async deleteProduct(id: string): Promise<IDatabaseOperationResponse> {
        try {
            await this.productEntity.update(
                { id },
                { archived: true },
            );

            return {
                err: false,
            };

        } catch (e) {
            return {
                err: true,
                msg: process.env.PRODUCTION ? 'error while deleting product.' : e,
            };
        }
    }

    validateProdcutObject(product: ProductEntity): Partial<ProductEntity> {
        const allowedProps = [
            'name',
            'gallery',
            'off',
        ];
        let updatedProduct: Partial<ProductEntity> = {};

        for (const prop in product) {
            if (allowedProps.indexOf(prop) > -1) {
                updatedProduct[prop] = product[prop];
            }
        }

        return updatedProduct;
    }
}
