import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/Matches';
import { homeTeams, awayTeams } from './mocks/learder.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard test', () => {
  afterEach(sinon.restore);

  it('Should list leaderboard of home teams', async () => {
    sinon.stub(matchesModel, 'findAll').resolves(homeTeams as any);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200); 
  });

  it('Should list leaderboard of home teams', async () => {
    sinon.stub(matchesModel, 'findAll').resolves(awayTeams as any);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(200); 
  });
});