import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from '../decorators/casl.decorator';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AppAbility } from './casl-ability.factory';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRule = this.reflector.get<RequiredRule>(
      CHECK_ABILITY,
      context.getHandler(),
    );
    if (!requiredRule) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const ability = this.caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(requiredRule.action, requiredRule.subject);

    if (!isAllowed) throw new ForbiddenException('Access denied');

    return true;
  }
}
