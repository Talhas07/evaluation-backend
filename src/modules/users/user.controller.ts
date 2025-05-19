import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Public } from 'src/modules/auth/public.decorator';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register user using invite token' })
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Get('status/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get registration status (JWT required)' })
  async getStatus(@Param('id') id: string) {
    return this.usersService.getStatus(id);
  }
}
