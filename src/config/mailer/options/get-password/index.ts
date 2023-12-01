import { IUserMail } from '../../../../../types';

export const optionsGetPass = (user: IUserMail) => {
  return {
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Hi ${user.name}`,
    html: 'Click on the following link to recover your password',
  };
};
