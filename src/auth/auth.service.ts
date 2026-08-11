import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/utils/bcryptService';
import { User } from 'prisma/generated/prisma/client';


@Injectable()
export class AuthService {

        constructor(private readonly userService: UserService, private readonly bcryptService:BcryptService){}
 
       async register(registerDetails: RegisterDto){
            try {
                const normalizedEmail = registerDetails.email.toLowerCase()
            const existingUser = await this.userService.findUserByEmail(normalizedEmail)

            if(existingUser){
                throw new ConflictException('A user with this email address already exists.')
            }

            const hashedPassword = await this.bcryptService.hashPassword(registerDetails.password)

            const registeredUser = await this.userService.registerUser({...registerDetails, email: normalizedEmail, password: hashedPassword})
               return {
                  success: true,
                  message: 'User Registered Successfully',
                  user: registeredUser
               }
            } catch (error) {
                throw error
            }



    

       }

       async login(loginDetails: LoginDto){
             try {
                const user = await this.userService.findUserByEmail(loginDetails.email.toLowerCase())

                if(!user){
                     throw new UnauthorizedException("Invalid Credentials!")
                }
                const comparePassword = await this.bcryptService.matchPassword(loginDetails.password, user.password)
                if(!comparePassword){
                      throw new UnauthorizedException("Invalid Credentials!")
                }

             } catch (error) {
                throw error
             }
       }

       async refreshToken(){

       }

       private generateTokens(user:Omit<User, 'password'>){

          

            

       }
    

    
}
