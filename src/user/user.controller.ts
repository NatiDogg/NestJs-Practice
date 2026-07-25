import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User, UserService } from './user.service';

@Controller('users')
export class UserController {


       constructor(private readonly userService:UserService){}

       @Get()
       getAllUsers():User[]{
         return this.userService.getAllUsers()
       }
       @Get(':id')
       getUserById(@Param('id',ParseIntPipe) id: number){
           return this.userService.getUserById(id)
       }
       @Get(':id/welcome')
        getWelcomeMessage(@Param('id',ParseIntPipe) id: number){
               return this.userService.getWelcomeMessage(id)
        }
}
