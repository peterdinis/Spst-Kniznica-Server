import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { ValidateUserDto } from '../dto/validate-user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(validateData: ValidateUserDto){
    const user = await this.userService.validateUser(validateData);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}