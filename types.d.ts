declare namespace Express {
  export interface Request {
    userId: string
  }
}

export interface IJWTToken {
  _id: string
}

export interface IUserMail {
  name: string,
  email: string
};

export interface IToken {
  expiresIn: number,
  token: string
}