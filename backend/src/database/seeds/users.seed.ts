import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '../../modules/users/schemas/user.schema';

@Injectable()
export class UsersSeedService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
