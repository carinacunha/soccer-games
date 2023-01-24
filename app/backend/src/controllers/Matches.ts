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

  public saveMatches: RequestHandler = async (req, res) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const matchesSaved = await this._serviceMatches
      .saveMatches({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return res.status(201).json(matchesSaved);
  };

  public changeToFinish: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
    await this._serviceMatches.changeToFinish(idNumber);
    return res.status(200).json({ message: 'Finished' });
  };

  public updatePoints: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const idNumber = parseInt(id, 10);
    await this._serviceMatches.updatePoints(idNumber, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Match updated' });
  };
}
