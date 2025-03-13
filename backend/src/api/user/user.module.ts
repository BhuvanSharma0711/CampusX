import { Module,Scope } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [ConfigModule,
    JwtModule.register({
      secret: "secret-key", // Replace with env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,ConfigService,JwtAuthGuard,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis("redis://localhost:6379");
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    }
  ],
  exports: [UserService, ConfigService,JwtAuthGuard],
})
export class UserModule {}
