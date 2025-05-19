import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invite } from './entities/invite.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(Invite)
    private inviteRepo: Repository<Invite>,
  ) {}

  async create(email: string, adminUser: any) {
    const token = uuidv4();

    const invite = this.inviteRepo.create({ email, token });
    await this.inviteRepo.save(invite);

    console.log(`[AUDIT] ${adminUser.name} invited ${email} - token: ${token}`);
    console.log(`[EMAIL SIM] Sent invite to ${email} with token: ${token}`);

    return { message: 'Invite sent', token };
  }
}
