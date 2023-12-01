import { IUserMail } from '../../../../../types';

export const optionsUserDelete = (user: IUserMail) => {
  return {
    from: '"Your Recipes team" <info@yourrecipes.com>',
    to: user.email,
    subject: `👋 Bye ${user.name}`,
    html: '<h1>Bye from our comunnity!</h1>',
  };
};
