import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/loggingInterceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, {
     logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: false,
        transform: true
      })
  )

  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
