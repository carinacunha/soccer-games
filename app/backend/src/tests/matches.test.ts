import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/Matches';
import { matches } from './mocks/matches.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches route test', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore
  });

  it('Shoud list all matches', async()=>{
    sinon.stub(matchesModel, 'findAll').resolves(matches as any);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  })
});