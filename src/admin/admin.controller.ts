import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) {}
}