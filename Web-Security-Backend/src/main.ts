import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookie from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = 1204;

  app.useGlobalInterceptors(new SuccessInterceptor());

  // 헬맷으로 전반적인 보안, csurf로 csrf 공격 차단
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
