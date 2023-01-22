import MatchesModel from '../database/models/Matches';

export default class TeamsService {
  constructor(private _matchesModel = MatchesModel) {}

  public async getAll() {
    const response = await this._matchesModel.findAll();
    return response;
  }
}
