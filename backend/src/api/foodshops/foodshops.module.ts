import { Module,Scope } from '@nestjs/common';
import { FoodshopsController } from './foodshops.controller';
import { FoodshopsService } from './foodshops.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log('REDIS_URL:', process.env.REDIS_URL);

@Module({
  imports: [ConfigModule],
  controllers: [FoodshopsController],
  providers: [FoodshopsService,ConfigService],
  exports: [FoodshopsService, ConfigService],
})
export class FoodshopsModule {}