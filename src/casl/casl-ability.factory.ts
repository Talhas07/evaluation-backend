import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { Invite } from 'src/modules/invites/entities/invite.entity';

export type Actions = 'create' | 'read' | 'update' | 'delete';
export type Subjects = InferSubjects<typeof Invite | typeof User> | 'all';

export type AppAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (user.role === 'admin') {
      can('create', Invite); // Only admin can create invites
      can('read', 'all');
    } else {
      can('read', User, { id: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
