import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// protects routes that requires authentications
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}