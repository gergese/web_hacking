import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Post,
  Get,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto): Promise<User> {
    return this.usersService.signUp(signUpUserDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    console.log(authCredentialsDto);
    return this.usersService.signIn(authCredentialsDto);
  }

  @Patch('newaccount')
  async addAccount(
    @Body('userId') userId: string,
    @Body('account') account: string,
  ) {
    return this.usersService.addAccount(userId, account);
  }

  @Get('account')
  @UseGuards(AuthGuard())
  async getAccount(@GetUser() user: User): Promise<{ account: string }> {
    const account = await this.usersService.getAccount(user.userId);
    return { account };
  }

  @Get('balance')
  @UseGuards(AuthGuard())
  async getBalance(@GetUser() user: User): Promise<{ balance: number }> {
    const balance = await this.usersService.getBalance(user.userId);
    return { balance };
  }

  @Patch('changeaccount')
  @UseGuards(AuthGuard())
  async updateAccount(@GetUser() user: User, @Body('account') account: string) {
    return this.usersService.updateAccount(user.userId, account);
  }

  @Post('load')
  @UseGuards(AuthGuard())
  async increaseBalance(
    @GetUser() user: User,
    @Body('amount') amount: number,
  ): Promise<void> {
    await this.usersService.increaseBalance(user.userId, amount);
  }

  @Post('transfer')
  @UseGuards(AuthGuard())
  async transferMoney(
    @GetUser() user: User,
    @Body('toUserAccount') toUserAccount: string,
    @Body('amount') amount: number,
  ) {
    return this.usersService.transferMoney(user.userId, toUserAccount, amount);
  }
}
