import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { Op } from 'sequelize';

import { AuthUserDto } from '../../dto/auth-user.dto';

import { User } from 'src/db/models/user';
import { HttpMessage } from 'src/constants/responseMessages';
import { AuthResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateJWT(id: number): string {
    return this.jwtService.sign({ id });
  }

  deletePassword(userInstance: User | null): User {
    if (userInstance == null) {
      throw new HttpException(HttpMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const userJson = userInstance.toJSON();
    delete userJson.password;
    return userJson;
  }

  async getUser({ login, email }): Promise<User> {
    return await this.userModel.findOne({
      where: {
        [Op.or]: [{ login }, { email }],
      },
    });
  }

  async registerUser(data: AuthUserDto): Promise<AuthResponse> {
    const existedUser = await this.getUser(data);
    if (existedUser != null)
      throw new HttpException(HttpMessage.USER_EXISTS, HttpStatus.CONFLICT);
    data.password = await hash(
      data.password,
      Number(this.configService.get('HASH_SALT_ROUND')),
    );
    try {
      const user = this.deletePassword(
        await this.userModel.create({
          ...data,
        }),
      );
      if (user != null) {
        return {
          user,
          token: this.generateJWT(user.id),
        };
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(HttpMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async authorizeUser(data: AuthUserDto): Promise<AuthResponse> {
    const user = await this.getUser(data);
    if (user == null)
      throw new HttpException(HttpMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    const isPasswordMatch = await compare(data.password, user.password);
    if (isPasswordMatch == false)
      throw new HttpException(
        HttpMessage.WRONG_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    const cleanedUser = this.deletePassword(user);
    return {
      user: cleanedUser,
      token: this.generateJWT(user.id),
    };
  }

  async verifyUser(id: number): Promise<User> {
    return this.deletePassword(
      await this.userModel.findOne({
        where: {
          id,
        },
      }),
    );
  }
}
