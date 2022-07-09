import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
    constructor(private readonly mailerService: MailerService) {}

    async sendBorrowingConfirmEmail() {}
}