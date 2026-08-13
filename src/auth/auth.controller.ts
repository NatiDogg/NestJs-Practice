import { Controller,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {

        constructor(private readonly authService:AuthService){}


        async register( @Body() registerDetails:RegisterDto){
             return await this.authService.register(registerDetails)
        }

        async login(@Body() loginDetails: LoginDto){
              return await this.authService.login(loginDetails)
        }

        async refresh(){

        }
        


}
