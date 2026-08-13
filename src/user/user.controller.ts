import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User, UserService } from './user.service';

@Controller('users')
export class UserController {


       constructor(private readonly userService:UserService){}

       
}
