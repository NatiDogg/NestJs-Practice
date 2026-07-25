import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { envConfig } from './utils/envValidation';
@Injectable()
export class AppService {
   
    constructor(private configService:ConfigService<envConfig>){}


  getHello(): string {
     const appName = this.configService.get<string>('APP_NAME')
    return `Hello ${appName}`;
  }
}
