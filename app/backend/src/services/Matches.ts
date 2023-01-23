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

  public async getFinished() {
    const allMatches = await this.getAll();
    const matchesFinished = allMatches.filter((match) => match.inProgress === false);
    return matchesFinished;
  }

  public async changeToFinish(id: number) {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }
}
