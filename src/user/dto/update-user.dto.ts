import { PartialType } from '@nestjs/mapped-types';
import { Borrowing } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  borrowedBooks?: Borrowing[];
}