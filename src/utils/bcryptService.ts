import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService{

     async hashPassword(password: string){
        return await bcrypt.hash(password, 10)
     }

     async matchPassword(password: string, userPassword: string){
          return await bcrypt.compare(password, userPassword)
     }
       
}