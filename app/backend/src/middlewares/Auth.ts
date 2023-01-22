import { Request, Response, NextFunction } from 'express';
import JWT from './JWT';

const jwt = new JWT();

const validationAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Token not found' });
  }
  const decoded = jwt.verifyToken(authorization);

  req.body.user = decoded;

  return next();
};

export default validationAuth;
