import { createTransporter } from './transporter';

export class MailService {
  static sendMail = async(options: object = {}) => {
    const transporter = createTransporter();
    const info = await transporter.sendMail(options);
  
    console.log('Mensaje sent: %s', info.messageId);
  
    return;
  };
};

export default MailService;
