import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { envConfig } from "./envValidation";
import jwt from 'jsonwebtoken'
@Injectable()

export class JwtService{

     constructor(private configService:ConfigService<envConfig>){}

     createAccessToken(userPayload){
       
     }

     createRefreshToken(){}
     verifyAccessToken(){}
     verifyRefreshToken(){}


}