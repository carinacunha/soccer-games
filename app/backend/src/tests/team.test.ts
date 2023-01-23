import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamModel from '../database/models/Teams';
import { teams, specificTeam } from './mocks/team.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route test', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore
  });

  it('Shoud list all teams', async()=>{
    sinon.stub(teamModel, 'findAll').resolves(teams as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  })

  it('Shoud list team by id', async()=>{
    sinon.stub(teamModel, 'findByPk').resolves(specificTeam as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id')
      .send("5");

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(specificTeam);
  })
});
