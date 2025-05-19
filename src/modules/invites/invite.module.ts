import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitesService } from './invite.service';
import { InvitesController } from './invite.controller';
import { Invite } from './entities/invite.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  providers: [InvitesService, CaslAbilityFactory],
  controllers: [InvitesController],
})
export class InvitesModule {}
