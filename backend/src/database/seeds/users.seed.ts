import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '../../modules/users/schemas/user.schema';

/**
 * UsersSeedService is responsible for creating an initial admin user.
 * 
 * Lifecycle:
 * - Implements OnModuleInit, so it runs automatically when the NestJS module
 *   is initialized.
 * - Reads admin credentials from environment variables:
 *   - ADMIN_NAME
 *   - ADMIN_ID_NUMBER
 * - If these are set and no admin user with the same ID exists, it creates the admin.
 */
@Injectable()
export class UsersSeedService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    /**
   * Called automatically by NestJS on module initialization.
   * Seeds an admin user if environment variables are set and no admin exists.
   */
  async onModuleInit() {
    const adminName = process.env.ADMIN_NAME;
    const adminId = process.env.ADMIN_ID_NUMBER;

    if (!adminName || !adminId) return;

    const existingAdmin = await this.userModel.findOne({ idNumber: adminId }).exec();
    if (!existingAdmin) {
      await this.userModel.create({ name: adminName, idNumber: adminId, role: UserRole.ADMIN });
      console.log('Admin user created');
    }
  }
}
