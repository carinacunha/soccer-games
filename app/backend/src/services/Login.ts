import * as bcrypt from 'bcryptjs';
import hashCripto from '../middlewares/hash';
import JWT from '../middlewares/JWT';
import UsersModel from '../database/models/Users';
import { ILogin } from '../Interfaces/ILogin';

export default class LoginService {
  private _jwt = new JWT();

  constructor(private _userModel = UsersModel) {}

  public async login({ email, password }: ILogin) {
    const userLogin = await this._userModel.findOne({ where: { email } });
    const cripto = hashCripto(password) as string;
    if (!userLogin || !bcrypt.compareSync(password, userLogin.password)) {
      return { isError: true };
    }
    const token = this._jwt.createToken({ email, password: cripto });
    return { token, isError: false };
  }

  public async findOne(user: ILogin) {
    const result = await this._userModel
      .findOne({ where: { email: user.email } }) as { role: string };
    return { role: result.role };
  }
}
