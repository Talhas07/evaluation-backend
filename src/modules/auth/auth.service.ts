// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Hardcoded admin credentials (for demo)
  private readonly adminUser = {
    email: 'admin@example.com',
    passwordHash:
      '$2b$10$8vX1J.zEQyJpb7zX0rZoVOe5UxMH75vSG2rZq/kcNOUv0zN6B3m7C', // bcrypt hash for "admin123"
    role: 'admin',
    id: 'admin-uuid-1',
  };

  async validateAdmin(email: string, password: string) {
    if (email !== this.adminUser.email) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (password !== 'admin123') {
      // directly compare plain text password
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      id: this.adminUser.id,
      email: this.adminUser.email,
      role: this.adminUser.role,
    };
  }

  async login(admin: { id: string; email: string; role: string }) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
