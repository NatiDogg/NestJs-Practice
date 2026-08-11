import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

        constructor(private readonly userService: UserService){}
 
       async register(registerDetails: RegisterDto){
            const normalizedEmail = registerDetails.email.toLowerCase()
            const existingUser = await this.userService.findUserByEmail(normalizedEmail)

            if(existingUser){
                throw new ConflictException('A user with this email address already exists.')
            }
            



       }

       async login(loginDetails: LoginDto){

       }

       async refreshToken(){

       }
    

    
}
