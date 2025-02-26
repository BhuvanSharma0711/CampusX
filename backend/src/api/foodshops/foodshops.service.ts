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
        const currentTime = new Date();
        currentTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0)

        const openShops = await this.prisma.foodshops.findMany({
        where: {
            AND: [
            { openby: { lte: currentTime } },
            { diningby: { gt: currentTime } }
            ],
        },
        });

        return openShops;
    }
}