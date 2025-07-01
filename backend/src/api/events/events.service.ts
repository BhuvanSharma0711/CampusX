import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserdetailsDto } from "../user/dto/basicdetails.dto";

@Injectable()
export class EventsService {
    constructor(
        private prisma : PrismaService,
    ) {}

    getevent():string {
        return "this is a event"
    }

    async getall() {
        const allEvents = await this.prisma.events.findMany();
        return allEvents;
    }

    async getrelevant(body: { email: string }) {
        const user = await this.prisma.user.findUnique({
            where: { email: body.email },
            select: { id: true },
        });

        if (!user) throw new Error('User not found');

        const details = await this.prisma.userDetails.findUnique({
            where: { userid: user.id },
        });

        if (!details) throw new Error('User details not found');

        const allEvents = await this.prisma.events.findMany({
            include: { eligibility: true },
        });

        const relevantEvents = allEvents.filter(event => {
            const el = event.eligibility;
            if (el.open) return true;

            const yearMatch = el.years.length === 0 || el.years.includes(details.Year);
            const courseMatch = el.Course.length === 0 || el.Course.includes(details.Course);
            const branchMatch = el.branch.length === 0 || el.branch.includes(details.Branch);
            const deptMatch = el.departments.length === 0 || el.departments.includes(details.Department);
            const genderMatch = el.genders.length===0 || (details.Gender && el.genders.includes(details.Gender));

            return yearMatch && courseMatch && branchMatch && deptMatch && genderMatch;
        });

        return relevantEvents;
    }
}