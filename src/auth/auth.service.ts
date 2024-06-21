import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return { password: user.password, username: user.username };
    }
    return null;
  }

  async login(user: { username: string; password: string }) {
    const validUser = await this.validateUser(user.username, user.password);

    if (!validUser) {
      throw new UnauthorizedException();
    }

    const payload = { username: validUser.username, sub: validUser.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    return newUser.toJSON();
  }
}
