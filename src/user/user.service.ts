import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

export type User ={
     id: number,
     name: string
}
@Injectable()
export class UserService {

    constructor(private readonly helloService:HelloService){}
     
    getAllUsers(): User[]{
           return [
              {
                id: 1,
                name: 'abebe'
              },
              {
                id: 2,
                name: 'kebede'
              },
              {
                id: 3,
                name: 'yonas'
              }
           ]
    }

    getUserById(id: number):User{
       const user = this.getAllUsers().find((u)=> u.id === id)
       if(!user){
        throw new NotFoundException(`User with ${id} ID not found`)
       }
       return user
    }

    getWelcomeMessage(userId: number): string{
         const user = this.getUserById(userId)
       if(!user){
        throw new NotFoundException(`User with ${userId} ID not found`)
       }

       return this.helloService.getHellowithName(user.name)
    }








}
