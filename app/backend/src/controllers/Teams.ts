import { RequestHandler } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
  constructor(private _serviceTeams = new TeamsService()) {}

  public getAllTeams: RequestHandler = async (_req, res) => {
    const allTeams = await this._serviceTeams.getAll();
    return res.status(200).json(allTeams);
  };

  public getTeamsById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    const team = await this._serviceTeams.getById(idNumber);
    return res.status(200).json(team);
  };
}
