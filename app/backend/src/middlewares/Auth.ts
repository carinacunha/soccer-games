import { Request, Response, NextFunction } from 'express';
import JWT from './JWT';

const jwt = new JWT();

const validationAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Token not found' });
    }
    const decoded = jwt.verifyToken(authorization);

    req.body.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error && error.name.includes('Token')) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
};

export default validationAuth;
