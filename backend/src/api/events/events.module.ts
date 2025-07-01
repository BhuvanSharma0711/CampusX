import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
    imports: [ConfigModule],
    controllers : [EventsController],
    providers : [EventsService,ConfigService],
    exports : [EventsService,ConfigService]
})
export class EventsModule{}