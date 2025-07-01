import { Module,Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import Redis from 'ioredis';
import { FoodshopsModule } from './api/foodshops/foodshops.module';
import { EventsModule } from './api/events/events.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule,PrismaModule,FoodshopsModule,EventsModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis("redis://localhost:6379");
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    },
  ],
})
export class AppModule {}
