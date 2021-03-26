import chai from 'chai';
import server from '../server';
import mongoose from 'mongoose';
import User from '../server/api/models/User';
import Pet from '../server/api/models/Pet';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pets', () => {
  let token = '';
  let petId = '';

  const testCredentials = {
    email: 'tester@gmail.com',
    password: 'tester123',
  };

  before(() => {
    // Connect to test database before tests run
    mongoose
      .connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('MongoDB test DB connected.'))
      .catch((err) => console.log(err));
  });

  after(() => {
    // Clean up test data after all tests run
    User.deleteMany({})
      .then(() => console.log('Removed test users.'))
      .catch((err) => console.log(err));

    Pet.deleteMany({})
      .then(() => console.log('Removed test users.'))
      .catch((err) => console.log(err));
  });

  it('should register a new user account', () => {
    // create a new account
    return chai
      .request(server)
      .post('/api/v1/auth/register')
      .send(testCredentials)
      .then((response) => {
        response.should.have.status(200);
        // log in with the newly created user
      })
      .catch((error) => should.not.exist(error));
  });

  it('should login and receive a token', () => {
    return chai
      .request(server)
      .post('/api/v1/auth/token')
      .send(testCredentials)
      .then((response) => {
        response.body.should.have.property('token');
        token = response.body.token;
      })
      .catch((error) => should.not.exist(error));
  });

  it('should create a new pet', () => {
    return chai
      .request(server)
      .post('/api/v1/pets')
      .send({ name: 'spot', category: 'dog', description: 'a cute dog' })
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        response.should.have.status(201);
        petId = response.body._id; // save the new pet's id for subsequent tests
      })
      .catch((error) => should.not.exist(error));
  });

  it('should update a pet', () => {
    return chai
      .request(server)
      .put(`/api/v1/pets/${petId}`)
      .send({ name: 'max', description: 'a nice dog' })
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        expect(response.body).to.have.property('name').equals('max');
        expect(response.body)
          .to.have.property('description')
          .equals('a nice dog');
      });
  });

  it('should fetch a pet', () => {
    return chai
      .request(server)
      .get(`/api/v1/pets/${petId}`)
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('category');
      })
      .catch((error) => should.not.exist(error));
  });

  it('should fetch all pets', () => {
    return chai
      .request(server)
      .get('/api/v1/pets')
      .then((response) => {
        expect(response.body.docs).to.be.an('array').of.length(1);
      })
      .catch((error) => should.not.exist(error));
  });

  it('should filter pets', () => {
    return chai
      .request(server)
      .get('/api/v1/pets/?category=dog')
      .then((response) => {
        expect(response.body.docs[0])
          .to.be.an('object')
          .that.has.property('category')
          .equal('dog');
      })
      .catch((error) => should.not.exist(error));
  });

  it('should archive a pet', () => {
    chai
      .request(server)
      .patch(`/api/v1/pets/${petId}/archive`)
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        response.should.have.status(200);
      })
      .catch((error) => should.not.exist(error));
  });

  it('should unarchive a pet', () => {
    chai
      .request(server)
      .patch(`/api/v1/pets/${petId}/unarchive`)
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        response.should.have.status(200);
      })
      .catch((error) => should.not.exist(error));
  });

  it('should delete a pet', () => {
    chai
      .request(server)
      .delete(`/api/v1/pets/${petId}`)
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        response.should.have.status(200);
      })
      .catch((error) => should.not.exist(error));
  });
});
