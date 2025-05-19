import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InvitesService } from './invite.service';
import { InviteDto } from './dto/invite.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CaslGuard } from 'src/casl/casl.guard';
import { CheckAbilities } from 'src/decorators/casl.decorator';
import { Invite } from './entities/invite.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Invites')
@Controller('invite')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  @CheckAbilities({ action: 'create', subject: Invite })
  @ApiOperation({ summary: 'Send invite (Admin only)' })
  async create(@Body() inviteDto: InviteDto, @Req() req: any) {
    return this.invitesService.create(inviteDto.email, req.user);
  }
}
