import { SetMetadata } from '@nestjs/common';

// roles: admin, user,
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
