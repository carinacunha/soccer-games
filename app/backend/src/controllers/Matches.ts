import { RequestHandler } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  constructor(private _serviceMatches = new MatchesService()) {}

  public getAllMatches: RequestHandler = async (_req, res) => {
    const allMatches = await this._serviceMatches.getAll();
    return res.status(200).json(allMatches);
  };
}
