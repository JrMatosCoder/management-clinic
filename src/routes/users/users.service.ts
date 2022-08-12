import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(user)
    private userModel: typeof user,
  ) {}

  async criptPassword(password: string){
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userObject = createUserDto;
    const passwordHash = await this.criptPassword(userObject.password);
    const user = await this.userModel.create({
      role: userObject.role,
      user: userObject.user,
      password: passwordHash,
    });
    if (!user) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('User created successfully', HttpStatus.OK);
  }

  async findAll() {
    const users = await this.userModel.findAll();
    if (users.length < 1) {
      throw new HttpException('no users found', HttpStatus.NOT_FOUND);
    } else {
      return this.userModel.findAll();
    }
  }

  findOne(params: any, query: any) {
    return {
      params,
      query,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
