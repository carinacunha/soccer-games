import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/Matches';
import { matches, newMatchResult, newMatch, finishedMatches, equals } from './mocks/matches.mocks';
import { token } from './mocks/login.mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches route test', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Shoud list all matches', async() => {
    sinon.stub(matchesModel, 'findAll').resolves(matches as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  })

  it('Should post a new match', async () => {
    sinon.stub(matchesModel, 'create').resolves(newMatchResult as any);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(newMatch);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(newMatchResult);
    
  });

  it('Should set progress to finished', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/47/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" });
  });

  it('Should update goals', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/47')
      .send({
        "homeTeamGoals": 6,
        "awayTeamGoals": 3
      });
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    
  });

  it('Should list matches finished', async () => {
    sinon.stub(matchesModel, 'findAll').resolves(finishedMatches as any);

    const chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
     ;
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches)
  });

  it('Should not post with two equal teams', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(equals);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
    
  });
});