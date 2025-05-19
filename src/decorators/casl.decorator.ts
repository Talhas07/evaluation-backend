import { SetMetadata } from '@nestjs/common';
import type { Actions } from '../casl/casl-ability.factory';

export const CHECK_ABILITY = 'check_ability';

export interface RequiredRule {
  action: Actions;
  subject: any;
}

export const CheckAbilities = (rule: RequiredRule) =>
  SetMetadata(CHECK_ABILITY, rule);
