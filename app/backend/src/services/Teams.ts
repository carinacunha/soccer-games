import TeamsModel from '../database/models/Teams';

export default class TeamsService {
  constructor(private _teamsModel = TeamsModel) {}

  public async getAll() {
    const response = await this._teamsModel.findAll();
    return response;
  }
}
