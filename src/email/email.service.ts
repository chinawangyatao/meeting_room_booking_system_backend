import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { createTransport, Transporter } from 'nodemailer';
import {
  EMAILPASS,
  EMAILUSERNAME,
  EMILHOST,
  EMILPORT,
  SYSTEMTITLE,
} from '../config';

/**
 * 邮箱注册服务
 * **/
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: EMILHOST,
      port: EMILPORT,
      secure: false,
      auth: {
        user: EMAILUSERNAME,
        pass: EMAILPASS,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: SYSTEMTITLE,
        address: EMAILUSERNAME,
      },
      to,
      subject,
      html,
    });
  }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
