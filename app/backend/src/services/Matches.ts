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
}
