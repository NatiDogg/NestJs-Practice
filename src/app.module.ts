import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/envValidation';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
//root module
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validate}),
    HelloModule, UserModule, PostsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
