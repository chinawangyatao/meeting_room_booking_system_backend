import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor()); //响应封装
  app.useGlobalInterceptors(new InvokeRecordInterceptor()); //接口访问记录的 interceptor

  const configService = app.get(ConfigService); //全局配置文件

  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
