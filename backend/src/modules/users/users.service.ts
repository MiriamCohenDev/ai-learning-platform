import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Creates a new user.
   * Throws BadRequestException if ID number already exists.
   * Handles potential race-condition duplicate key errors from MongoDB.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { idNumber } = createUserDto;

    const existingUser = await this.userModel.findOne({ idNumber }).exec();
    if (existingUser) throw new BadRequestException('ID number already exists');

    const newUser = new this.userModel(createUserDto);
    try {
      return await newUser.save();
    } catch (err: any) {
      // handle race-condition duplicate key errors from MongoDB
      if (err && err.code === 11000) {
        throw new BadRequestException('ID number already exists');
      }
      throw err;
    }
  }

    /**
   * Returns all users.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

    /**
   * Validates a user by name and idNumber.
   * Returns sanitized object (removes __v) if valid.
   */
  async validateUser(name: string, idNumber: string) {
    if (!name || !idNumber) return null;
    const user = await this.userModel.findOne({ idNumber }).exec();
    if (!user) return null;
    if (user.name !== name) return null;
    const obj = user.toObject ? user.toObject() : user;
    const { __v, ...result } = obj as any;
    return result;
  }

    /**
   * Finds a user by ID number.
   */
  async findByIdNumber(idNumber: string) {
    return this.userModel.findOne({ idNumber }).exec();
  }

}
