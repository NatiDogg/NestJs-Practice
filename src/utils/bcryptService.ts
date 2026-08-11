import { Injectable, InternalServerErrorException } from '@nestjs/common';
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService{

     async hashPassword(password: string): Promise<string>{
          try {
               return await bcrypt.hash(password, 10)
          } catch (error) {
                throw new InternalServerErrorException("Failed to hash password")
          }
     }

     async matchPassword(password: string, userPassword: string):Promise<boolean>{
          try {
             return await bcrypt.compare(password, userPassword)  
          } catch (error) {
                throw new InternalServerErrorException("Failed to verify password")
          }
     }
       
}