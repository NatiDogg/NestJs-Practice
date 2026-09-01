import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type { UserRegisteredEvent } from "../userEventsService";


// event listeners -> respond to the events emitted by eventemitter 

@Injectable()

export class UserRegisteredListener{
      
      private readonly logger = new Logger(UserRegisteredListener.name)

      @OnEvent('user.registered')
      handleUserRegisteredEvent(event: UserRegisteredEvent): void{
        const {user, timeStamp} = event

        this.logger.log(`Welcome, ${user.email}! Your account created at ${timeStamp.toISOString()}`)
      }
}