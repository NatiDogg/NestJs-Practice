import { Controller,Body, Post,Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwtAuthGuard';

import { CurrentUser } from './decorators/currentUserDecorator';
import { Role, User } from 'prisma/generated/prisma/client';
import { Roles } from './decorators/rolesDecorators';
import { RolesGuard } from './guards/rolesGuard';


@Controller('auth')
export class AuthController {

        constructor(private readonly authService:AuthService){}

        @Post('register')
        async register( @Body() registerDetails:RegisterDto){
             return await this.authService.register(registerDetails)
        }

        @Post("login")
        async login(@Body() loginDetails: LoginDto){
              return await this.authService.login(loginDetails)
        }
         
        @Post("refresh")
        async refreshToken(@Body("refreshToken") refreshToken: string){
              return await this.authService.refreshToken(refreshToken)
        }

        @UseGuards(JwtAuthGuard)
        @Get('profile')
        getProfile(@CurrentUser() user: Omit<User, 'password'>){
              return {user: user}
        }

        @Roles(Role.ADMIN)
        @UseGuards(JwtAuthGuard,RolesGuard)
        @Post("create-admin")
        async createAdmin(@Body() registerDetails:RegisterDto){
            return await this.authService.createAdmin(registerDetails)
        }


        
       



}
