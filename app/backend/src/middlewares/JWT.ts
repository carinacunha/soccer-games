import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { ILogin } from '../Interfaces/ILogin';

export default class JWT {
  private _secretKey: Secret = process.env.JWT_SECRET || 'jwt_secret';
  private _jwtConfig: SignOptions = { expiresIn: '5d', algorithm: 'HS256' };

  public createToken(payload: ILogin) {
    const token = jwt.sign({ ...payload }, this._secretKey, this._jwtConfig);
    return token;
  }

  public verifyToken(token: string) {
    const decoded = jwt.verify(token, this._secretKey);
    return decoded;
  }
}
