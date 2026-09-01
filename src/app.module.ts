import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/envValidation';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {ThrottlerModule} from '@nestjs/throttler'
import {CacheModule} from '@nestjs/cache-manager'
import { FileUploadModule } from './file-upload/file-upload.module';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './common/middleware/loggerMiddleware';
//root module
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validate}),
    ThrottlerModule.forRoot({
        throttlers: [
            {
              ttl: 60000,
              limit: 5
            }
        ]
    }),
    CacheModule.register({
        isGlobal: true,
        ttl: 30000,
        max : 100

    }),
    
    HelloModule, UserModule, PostsModule, PrismaModule, AuthModule, FileUploadModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      //apply middleware for all the routes
       consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
