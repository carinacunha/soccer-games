import { Request, Response, NextFunction } from 'express';

const emailPasswordValidation = (email: string, password: string) =>
  !email || !password;

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const isError = emailPasswordValidation(email, password);
  if (isError) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

export default loginValidation;
