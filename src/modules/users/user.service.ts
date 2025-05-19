import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Invite } from 'src/modules/invites/entities/invite.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Invite)
    private inviteRepo: Repository<Invite>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ token, name, password }: RegisterDto) {
    const invite = await this.inviteRepo.findOne({
      where: { token, used: false },
    });

    if (!invite) {
      throw new BadRequestException('Invalid or expired invite token');
    }

    const existingUser = await this.userRepo.findOne({ where: { name } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      password: hashedPassword,
      role: 'contributor',
      status: 'pending_approval',
    });

    await this.userRepo.save(user);

    invite.used = true;
    await this.inviteRepo.save(invite);

    console.log(`[AUDIT] Registered user ${name} with role 'contributor'`);

    // Generate JWT
    const payload = { sub: user.id, name: user.name, role: user.role };
    const access_token = this.jwtService.sign(payload);

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
      access_token,
    };
  }

  async getStatus(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      status: user.status,
    };
  }
}
