import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FoodshopsService {
    constructor (
        private prisma:PrismaService,
    ) {}

    getFood():string {
        return "hey! wanna eat something."
    }

    async getopendiningshops() {
        const now = new Date();
        const istNow = new Date(now.getTime());
        const currentTime : string = (istNow.toLocaleTimeString("en-IN", { hour12: false }).slice(0, 5));
        const openShops = await this.prisma.$queryRaw`
            SELECT * FROM "Foodshops"
            WHERE (openby <= ${currentTime} AND diningby > ${currentTime}) 
            OR (diningby<openby AND openby >= ${currentTime} AND diningby >= ${currentTime}) 
            OR (diningby<openby AND openby <= ${currentTime} AND diningby <= ${currentTime}); 
        `;
        return openShops;
    }
}