declare namespace Express {
  export interface Request {
    userId: string
  }
}

export interface IJWTToken {
  _id: string
}