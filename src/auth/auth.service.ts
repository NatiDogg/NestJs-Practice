import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { UserService } from 'src/user/user.service';
import { BcryptService } from 'src/utils/bcryptService';
import { Prisma, User } from 'prisma/generated/prisma/client';
import { JwtService } from 'src/utils/jwtService';
import { UserEventsService } from 'src/events/userEventsService';


@Injectable()
export class AuthService {

        constructor(
         private readonly userService: UserService, 
         private readonly bcryptService:BcryptService, 
         private readonly jwtService:JwtService, 
         private readonly userEventService: UserEventsService){}
 
       async register(registerDetails: RegisterDto){
            try {
                const normalizedEmail = registerDetails.email.toLowerCase()
            const existingUser = await this.userService.findUserByEmail(normalizedEmail)

            if(existingUser){
                throw new ConflictException('A user with this email address already exists.')
            }

            const hashedPassword = await this.bcryptService.hashPassword(registerDetails.password)

            const registeredUser = await this.userService.registerUser({...registerDetails, email: normalizedEmail, password: hashedPassword})

               // Emit the user registered event
            
                this.userEventService.emitUserRegistered(registeredUser)

               return {
                  success: true,
                  message: 'User Registered Successfully',
                  user: registeredUser
               }
            } catch (error) {
                throw error
            }



    

       }
       async createAdmin(registerDetails:RegisterDto){

          const normalizedEmail = registerDetails.email.toLowerCase()

          try {
            const newlyCreatedAdmin = await this.userService.registerAdmin(registerDetails)
              return {
                  success: true,
                  message: 'Admin Registered Successfully',
                  user: newlyCreatedAdmin
               }
          } catch (error) {
               if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'){
                throw new ConflictException("a user with this email already exists")
               }
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
                 const {password, ...safeUser} = user
                return this.generateTokens(safeUser,'User Logged in Successfully!')

             } catch (error) {
                throw error
             }
       }

       async refreshToken(refreshToken: string){
             try {
               const payload = this.jwtService.verifyRefreshToken(refreshToken)

             if(!payload){
               throw new UnauthorizedException("Invalid Token")
             }

             const user = await this.userService.findUserById(payload.id)
             if(!user){
               throw new UnauthorizedException("user Not Found")
             }
             return this.generateTokens(user,'Refresh Token issued Successfully')
             } catch (error) {
               throw new UnauthorizedException("Invalid Token")
             }


       }

       private generateTokens(user:Omit<User, 'password'>, message: string){
           const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
           }
          const accessToken = this.jwtService.createAccessToken(payload)
          const refreshToken = this.jwtService.createRefreshToken(payload)

           return {
             success: true,
             message: message,
             user: user,
             accessToken: accessToken,
             refreshToken: refreshToken
           }

          

            

       }
    

    
}
