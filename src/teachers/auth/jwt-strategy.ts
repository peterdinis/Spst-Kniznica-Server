import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TeachersService } from '../teachers.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly teachersService: TeachersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY as string
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this.teachersService.getTeacherByEmail(payload.email);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}