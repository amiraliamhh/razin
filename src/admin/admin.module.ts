import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ManageUsersModule } from './manage-users/manage-users.module';
import { ManageProductsModule } from './manage-products/manage-products.module';

@Module({
    imports: [
        ManageUsersModule,
        ManageProductsModule,
    ],
    controllers: [
        AdminController,
    ],
    providers: [
        AdminService,
    ],
})
export class AdminModule {}