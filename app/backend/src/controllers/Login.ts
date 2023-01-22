import { RequestHandler } from 'express';
import LoginService from '../services/Login';

export default class LoginController {
  constructor(private _serviceLogin = new LoginService()) {}

  public login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const { token, isError } = await this
      ._serviceLogin.login({ email, password });

    if (isError) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  };

  public validateTypeUser: RequestHandler = async (req, res) => {
    const { role } = await this._serviceLogin.findOne(req.body.user);
    return res.status(200).json({ role });
  };
}
