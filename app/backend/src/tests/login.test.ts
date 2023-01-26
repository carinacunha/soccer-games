import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import userModel from '../database/models/Users';
import { user, infos, token } from './mocks/login.mocks';
import JWT from '../middlewares/JWT';
import IJwt from '../Interfaces/IJwt';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login route test', () => {
  
  const role = {role: 'user'};
  

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore
  });

  // it('Shoud login successfully', async()=>{
  //   sinon.stub(userModel, 'findOne').resolves(user as any);

  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'admin@admin.com', password: 'secret_admin' });

  //     const jwt = new JWT();
  //     const validate = jwt.verifyToken(chaiHttpResponse.body.token) as IJwt;

  //     expect(chaiHttpResponse.status).to.be.equal(200);
  //     expect(chaiHttpResponse.body).to.have.property('token');
  //     expect(validate.email).to.be.equal(user.email);
  // })

  it('Shoud login unsuccessfully with wrong password', async()=>{
    sinon.stub(userModel, 'findOne').resolves(user as any);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      
  })

  it('Shoud login unsuccessfully with wrong user', async()=>{
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin', password: 'admin' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  })

  it('Should not login without password', async() => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  
  it('Should not login without email', async() => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_key' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should return error without token', async () => {
    sinon.stub(jwt, 'verify').resolves({role: 'user'} as any);

    const  chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate');

    expect( chaiHttpResponse.status).to.be.equal(400);
    expect( chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found'});
  });

});
