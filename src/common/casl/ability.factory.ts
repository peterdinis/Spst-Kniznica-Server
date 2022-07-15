import { Injectable } from '@nestjs/common';
import { Admin } from '../../admin/admin.entity';
import { User } from '../../users/user.entity';
import { Action } from './casl.actions';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';

export type AdminSubjects = InferSubjects<typeof Admin> | 'all';
export type UserSubjects = InferSubjects<typeof User> | 'all';

