import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from 'src/utils/bcryptService';
import { JwtService } from 'src/utils/jwtService';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwtStrategy';
import { RolesGuard } from './guards/rolesGuard';
import { EventsModule } from 'src/events/events.module';
@Module({
  providers: [AuthService,BcryptService,JwtService,JwtStrategy,RolesGuard],
  controllers: [AuthController],
  imports: [UserModule,PassportModule.register({defaultStrategy: 'jwt'}), EventsModule],
  exports: [AuthService,RolesGuard,PassportModule]
})
export class AuthModule {}
