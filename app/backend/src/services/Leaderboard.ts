import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import ITeams from '../Interfaces/ITeams';
import {
  scoreboardTeamAway,
  scoreboardTeamHome,
  classification,
} from '../middlewares/leaderboards';

export default class LeaderboardService {
  constructor(
    private _matchesModel = MatchesModel,
    private _teamsModel = TeamsModel,
  ) {}

  public async getLeaderboardsHome() {
    const allTeams = await this._teamsModel.findAll() as unknown as ITeams[];

    const homeTeams = await allTeams.map(async (team) => {
      const homeTeamMatches = await this._matchesModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );
      const homeScoreboard = await homeTeamMatches.map((match) => (
        scoreboardTeamHome(team.teamName, [match])));
      const statistics = homeScoreboard[homeScoreboard.length - 1];

      return { ...statistics };
    });

    const teamsData = await Promise.all(homeTeams);
    return classification(teamsData);
  }

  public async getLeaderboardsAway() {
    const allTeams = await this._teamsModel.findAll() as unknown as ITeams[];

    const awayTeams = await allTeams.map(async (team) => {
      const awayTeamMatches = await this._matchesModel.findAll(
        { where: { awayTeamId: team.id, inProgress: false } },
      );
      const awayScoreboard = await awayTeamMatches.map((match) => (
        scoreboardTeamAway(team.teamName, [match])));

      const statistics = awayScoreboard[awayScoreboard.length - 1];

      return { ...statistics };
    });

    const teamsData = await Promise.all(awayTeams);
    return classification(teamsData);
  }
}
