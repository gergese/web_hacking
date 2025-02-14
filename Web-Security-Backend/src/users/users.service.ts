import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpUserDto } from './dtos/signup-user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const { password } = signUpUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.repo.create({
      ...signUpUserDto,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async signIn(authCredentialsDto) {
    const { userId, password } = authCredentialsDto;

    // PostgreSQL 연결 설정
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'jaegujaegu',
      port: 5432, // PostgreSQL 기본 포트
    });

    await client.connect();

    try {
      // 파라미터화된 쿼리 사용
      const query = `SELECT * FROM "user" WHERE "userId" = $1 AND "password" = $2`;
      const values = [userId, password];

      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const payload = {
          userId: user.userId,
          type: user.type,
          userName: user.name,
        };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      } else {
        throw new UnauthorizedException('login failed');
      }
    } finally {
      await client.end();
    }
  }

  async addAccount(userId: string, account: string): Promise<any> {
    const user = await this.repo.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.account = account;
    await this.repo.save(user);
  }

  async updateAccount(userId: string, account: string): Promise<void> {
    const user = await this.repo.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.account = account;
    await this.repo.save(user);
  }

  async transferMoney(
    fromUserId: string,
    toUserAccount: string,
    amount: number,
  ): Promise<void> {
    const fromUser = await this.repo.findOne({ where: { userId: fromUserId } });
    const toUser = await this.repo.findOne({
      where: { account: toUserAccount },
    });

    if (!fromUser || !toUser) {
      throw new Error('User not found');
    }
    if (fromUser.balance < amount) {
      throw new Error('Insufficient balance');
    }
    fromUser.balance -= amount;
    toUser.balance += amount;

    await this.repo.save(fromUser);
    await this.repo.save(toUser);
  }

  async getAccount(userId: string): Promise<string> {
    const user = await this.repo.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user.account;
  }

  async increaseBalance(userId: string, amount: number): Promise<void> {
    const user = await this.repo.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.balance += amount;
    await this.repo.save(user);
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.repo.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user.balance;
  }
}
