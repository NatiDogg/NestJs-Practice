import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/utils/bcryptService';
import { JwtService } from 'src/utils/jwtService';
import {PassportModule} from '@nestjs/passport'
@Module({
  providers: [AuthService,BcryptService,JwtService],
  controllers: [AuthController],
  imports: [UserModule,PassportModule.register({defaultStrategy: 'jwt'})],
  exports: [AuthService]
})
export class AuthModule {}
