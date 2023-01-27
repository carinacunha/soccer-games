import { RequestHandler } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  constructor(private _serviceLeader = new LeaderboardService()) {}
  public getHomeLeaderboard: RequestHandler = async (_req, res) => {
    const leaderboardHome = await this._serviceLeader.getLeaderboardsHome();
    return res.status(200).json(leaderboardHome);
  };

  public getAwayLeaderboard: RequestHandler = async (_req, res) => {
    const leaderboardAway = await this._serviceLeader.getLeaderboardsAway();
    return res.status(200).json(leaderboardAway);
  };

  public getLeaderboardRank: RequestHandler = async (_req, res) => {
    const leaderboardRank = await this._serviceLeader.getLeaderboardRank();
    return res.status(200).json(leaderboardRank);
  };
}
