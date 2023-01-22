import TeamsModel from '../database/models/Teams';

export default class TeamsService {
  constructor(private _teamsModel = TeamsModel) {}

  public async getAll() {
    const response = await this._teamsModel.findAll();
    return response;
  }

  public async getById(id: number) {
    const team = await this._teamsModel.findByPk(id);
    return team;
  }
}
