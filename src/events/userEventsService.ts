import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "prisma/generated/prisma/client";
import { email } from "zod";

export interface UserRegisteredEvent{
      user: {
          id: string
          email: string
          name: string
      },
      timeStamp: Date
}
@Injectable()

export class UserEventsService{
     constructor(private readonly eventEmitter: EventEmitter2){}

     //Emit an user registered events

     emitUserRegistered(user: User): void{
         const event: UserRegisteredEvent = {
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              },
              timeStamp: user.createdAt
         }
     }
}