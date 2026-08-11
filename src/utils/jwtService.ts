import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { envConfig } from "./envValidation";
import jwt from 'jsonwebtoken'
import { Role } from "prisma/generated/prisma/enums";
@Injectable()

export class JwtService{

     constructor(private configService:ConfigService<envConfig>){}

     createAccessToken(userPayload: {id: string, name: string, email: string, role:Role}){
           return jwt.sign(userPayload, this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN'), {expiresIn: '15m'})
     }

     createRefreshToken(){}
     verifyAccessToken(){}
     verifyRefreshToken(){}


}