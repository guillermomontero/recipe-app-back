import nodemailer from 'nodemailer';
interface IUserMail {
  name: string,
  email: string
};

// Principal transport
const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PSW
    }
  });

  return transport;
};

export const sendMailWelcome = async(user: IUserMail) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Hi ${user.name}`,
    html: '<h1>Welcome to our comunnity!</h1>',
  });

  console.log('Mensaje sent: %s', info.messageId);

  return;
}

export const sendMailGetPass = async(user: IUserMail) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Hi ${user.name}`,
    html: 'Click on the following link to recover your password',
  });

  console.log('Mensaje sent: %s', info.messageId);

  return;
}

export const sendMailUserCancellation = async(user: IUserMail) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Bye ${user.name}`,
    html: 'Click on the following link to recover your password',
  });

  console.log('Mensaje sent: %s', info.messageId);

  return;
}

export const sendMailUserDelete = async(user: IUserMail) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Bye ${user.name}`,
    html: 'User delete',
  });

  console.log('Mensaje sent: %s', info.messageId);

  return;
}
