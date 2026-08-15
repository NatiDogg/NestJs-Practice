import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerDto';
import { HelloService } from 'src/hello/hello.service';
import { PrismaService } from 'src/prisma/prisma.service';

export type User ={
     id: number,
     name: string
}
@Injectable()
export class UserService {

      constructor(private prisma: PrismaService){}


      async registerUser(userDetails:RegisterDto){
          return await this.prisma.user.create({data: {...userDetails}, omit:{password: true}})
      }
      async findUserByEmail(email: string){
          return await this.prisma.user.findUnique({where: {email}})
      }
      async findUserById(id: string){
          return await this.prisma.user.findUnique({where: {id},omit:{password: true}})
      }
      async registerAdmin(adminDetails:RegisterDto){
          return await this.prisma.user.create({data:{
             ...adminDetails,
             role: 'ADMIN'
          }})
      }

   







}
