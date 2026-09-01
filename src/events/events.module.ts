import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventsService } from './userEventsService';
import { UserRegisteredListener } from './listeners/userRegisteredListener';

@Module({
    imports:[
        EventEmitterModule.forRoot({
             global: true,
             wildcard: false,
             maxListeners: 20,
             verboseMemoryLeak: true
        })
    ],
    providers: [UserEventsService,UserRegisteredListener],
    exports: [UserEventsService]
})
export class EventsModule {} 
