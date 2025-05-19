import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/user.module';
import { InvitesModule } from './modules/invites/invite.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { Invite } from './modules/invites/entities/invite.entity';
import { APP_GUARD } from '@nestjs/core';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { CaslGuard } from './casl/casl.guard';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Invite],
        synchronize: true, // disable in production
      }),
    }),
    UsersModule,
    InvitesModule,
    AuthModule,
  ],
  controllers: [AppController],

  providers: [
    AppService,
    CaslAbilityFactory,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // global JWT guard
    },
    {
      provide: APP_GUARD,
      useClass: CaslGuard, // global RBAC guard
    },
  ],
})
export class AppModule {}
