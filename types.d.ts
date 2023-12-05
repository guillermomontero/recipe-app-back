declare namespace Express {
  export interface Request {
    userId: string
  }
}

export interface IUserMail {
  name: string,
  email: string
};

export interface IToken {
  expiresIn: number | string,
  token: string
}