import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {


    getHello(): string{
        return 'hello user'
    }

    getHellowithName(name: string):string{
         return `hello ${name || 'Guest'}`
    }
}
