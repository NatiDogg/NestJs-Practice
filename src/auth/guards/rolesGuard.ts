import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "prisma/generated/prisma/enums";

import { ROLES_KEY } from "../decorators/rolesDecorators";


@Injectable()

//workflow..... client->jwtauthguard->rolesguard->fail or proceed to the controller

export class RolesGuard implements CanActivate{

           ///reflector is a utility that will help to access the metadata
       constructor(private reflector:Reflector){}

        //canactivate method is like next() in express middleware

       canActivate(context: ExecutionContext):boolean {
          // retrive the roles metadata set by the roles decorator 
         const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),// method level metadata
             context.getClass() // class level metadata
            ])

            if(!requiredRoles){
                return true
            }

            const {user} = context.switchToHttp().getRequest()
             if(!user){
              throw new UnauthorizedException("User is not authenticated");
           }

            const hasRequiredRole = requiredRoles.includes(user.role)

            if(!hasRequiredRole){
                 throw new ForbiddenException('Access denied. You do not have the required permissions.');
            }

            return true
            
           


       }



}