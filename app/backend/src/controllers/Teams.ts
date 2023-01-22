import { RequestHandler } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
  constructor(private _serviceTeams = new TeamsService()) {}

  public getAllTeams: RequestHandler = async (_req, res) => {
    const allTeams = await this._serviceTeams.getAll();
    return res.status(200).json({ allTeams });
  };
}
