import { SetMetadata } from '@nestjs/common';

/**
 * Roles decorator for route handlers.
 * Usage: @Roles('admin', 'user')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
