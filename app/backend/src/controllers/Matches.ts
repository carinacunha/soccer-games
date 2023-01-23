import { RequestHandler } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  constructor(private _serviceMatches = new MatchesService()) {}

  public getMatches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matchesInProgress = await this._serviceMatches.getInProgress();
      return res.status(200).json(matchesInProgress);
    }

    if (inProgress === 'false') {
      const matchesFinished = await this._serviceMatches.getFinished();
      return res.status(200).json(matchesFinished);
    }
    const allMatches = await this._serviceMatches.getAll();
    return res.status(200).json(allMatches);
  };
}
