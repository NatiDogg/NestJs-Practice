import { Controller,Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {

       constructor(private readonly helloService:HelloService){}
        
        @Get()
        getHello(){
            return this.helloService.getHello()
       }
       @Get('user')
       getHelloWithName(@Query('name') name: string){
           return this.helloService.getHellowithName(name)
       }
}
