import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { envConfig } from "src/utils/envValidation";
import { UserService } from "src/user/user.service";
import { Role } from "prisma/generated/prisma/enums";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){

       constructor(private configService:ConfigService<envConfig>, private readonly userService:UserService){
           super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_TOKEN'),
             ignoreExpiration: false
           })
       }

       async validate(payload: {id: string, name: string, email: string, role:Role}) {
            const user = await this.userService.findUserById(payload.id)
            if(!user){
                 throw new UnauthorizedException("User doesnt exist")
            }
            return user
       }

      
       
}