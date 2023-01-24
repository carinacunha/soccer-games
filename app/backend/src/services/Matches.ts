import IMatchesSave from '../Interfaces/IMatchesSave';
import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';

export default class MatchesService {
  constructor(private _matchesModel = MatchesModel) {}

  public async getAll() {
    const response = await this._matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        { model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });
    return response;
  }

  public async getInProgress() {
    const allMatches = await this.getAll();
    const matchesInProgress = allMatches.filter((match) => match.inProgress === true);
    return matchesInProgress;
  }

  public async saveMatches({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: IMatchesSave) {
    const allMatches = await this.getAll();
    const homeTeam = allMatches.find((elem) => elem.id === homeTeamId);
    const awayTeam = allMatches.find((elem) => elem.id === awayTeamId);
    if (!homeTeam || !awayTeam) return undefined;
    const matchesSaved = await this._matchesModel.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return matchesSaved;
  }

  public async getFinished() {
    const allMatches = await this.getAll();
    const matchesFinished = allMatches.filter((match) => match.inProgress === false);
    return matchesFinished;
  }

  public async changeToFinish(id: number) {
    await this._matchesModel.update({ inProgress: 0 }, { where: { id } });
  }

  public async updatePoints(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this._matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
