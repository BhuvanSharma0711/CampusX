import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventsService } from "./events.service";
import { UserdetailsDto } from "../user/dto/basicdetails.dto";

@Controller('events')
export class EventsController {
    constructor(private readonly EventService : EventsService ) {}

    @Get('all')
    getall() {
        return this.EventService.getall();
    }

    @Post('relevant')
    async getrelevant(@Body() body: { email: string }) {
        return this.EventService.getrelevant(body);
    }

}