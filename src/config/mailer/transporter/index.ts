import nodemailer from 'nodemailer';

// Principal transport
export const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PSW
    }
  });

  return transport;
};
