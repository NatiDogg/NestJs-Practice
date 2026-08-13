import { Controller,Body, Post,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';

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



}
