import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from '../email/email.service';
import { RedisService } from '../redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  constructor(private readonly userService: UserService) {}

  /**
   * 注册接口
   * **/
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  /**
   * 获取验证码的方法
   * */
  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '微梦创新-注册验证码',
      html: `<div>
                  <p>尊敬的 ${address}，您好!</p>
                  <p>欢迎使用微梦创新科技的产品。</p>
                  <p>你的注册验证码是 <strong><span style="font-size:24px">${code}</span></strong></p>
             </div>`,
    });
    return '发送成功';
  }

  /**
   * 初始化数据
   * **/
  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return '成功';
  }

  /**
   * 登陆
   * **/
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    return await this.userService.login(loginUser, false);
  }
  /**
   * 管理员登陆
   * **/
  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    return await this.userService.login(loginUser, true);
  }
}
