import { IUserMail, IToken } from '../../../../../types';

export const optionsWelcome = (user: IUserMail, token: IToken) => {
  return {
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Hi ${user.name}`,
    html: `
      <h1>Welcome to our comunnity!</h1>
      <p>Verify your account on the next link:</p>
      <a href="http://localhost:3000/api/v1/auth/verifyAccount/${token.token}">Verify account</a>
    `,
  };
};
