import { Request, Response } from "express";

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    res.send({ msg: 'Upload success'});
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};

export const uploadRecipe = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    res.send({ msg: 'Upload success'});
  } catch (error) {
    return res.status(400).json({
      mensaje: 'An error occurred',
      error,
    });
  }
};