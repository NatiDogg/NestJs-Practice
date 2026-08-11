import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { envConfig } from "./envValidation";
@Injectable()

export class JwtService{

     constructor(){}

     createAccessToken(){}

     createRefreshToken(){}
     verifyAccessToken(){}
     verifyRefreshToken(){}


}