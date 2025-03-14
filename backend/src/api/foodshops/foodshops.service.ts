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
        const opendiningShops = await this.prisma.$queryRaw`
            SELECT * FROM "Foodshops"
            WHERE (dining=true AND openby <= ${currentTime} AND diningby > ${currentTime}) 
            OR (dining=true AND diningby<openby AND openby >= ${currentTime} AND diningby >= ${currentTime}) 
            OR (dining=true AND diningby<openby AND openby <= ${currentTime} AND diningby <= ${currentTime}); 
        `;
        return opendiningShops;
    }

    async getdiningshops() {
        const diningShops = await this.prisma.foodshops.findMany({
            where:{
                dining:true,
            },
        });
        return diningShops;
    }

    async getdeliveryshops() {
        const deliveryShops = await this.prisma.foodshops.findMany({
            where:{
                delivery:true,
            },
        });
        return deliveryShops;
    }

    async getopendeliveryshops() {
        const now = new Date();
        const istNow = new Date(now.getTime());
        const currentTime : string = (istNow.toLocaleTimeString("en-IN", { hour12: false }).slice(0, 5));
        const opendeliveryShops = await this.prisma.$queryRaw`
            SELECT * FROM "Foodshops"
            WHERE (delivery=true AND openby <= ${currentTime} AND deliveryby > ${currentTime}) 
            OR (delivery=true AND deliveryby<openby AND openby >= ${currentTime} AND deliveryby >= ${currentTime}) 
            OR (delivery=true AND deliveryby<openby AND openby <= ${currentTime} AND deliveryby <= ${currentTime}); 
        `;
        return opendeliveryShops;
    }
}