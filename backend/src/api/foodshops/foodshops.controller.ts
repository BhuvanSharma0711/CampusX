import { FoodshopsService } from './foodshops.service';
import {Controller, Get,} from '@nestjs/common';

@Controller('foodshops')
export class FoodshopsController {
  constructor(private readonly foodshopsService: FoodshopsService) {}

  @Get()
  getFood():string {
    return this.foodshopsService.getFood();
  }

  @Get('getdiningshops')
  getshops() {
    return this.foodshopsService.getdiningshops();
  }

  @Get('getdeliveryshops')
  getdeliveryshops() {
    return this.foodshopsService.getdeliveryshops();
  }

  @Get('getopendiningshops')
  getopendiningshops() {
    return this.foodshopsService.getopendiningshops();
  }

  @Get('getopendeliveryshops')
  getopendeliveryshops() {
    return this.foodshopsService.getopendeliveryshops();
  }
}