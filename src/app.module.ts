import { Module } from '@nestjs/common';
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
    
    HelloModule, UserModule, PostsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
