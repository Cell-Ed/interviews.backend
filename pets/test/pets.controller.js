import chai from 'chai';
import request from 'supertest';
import Server from '../server';

const expect = chai.expect;

describe('Pets', () => {
  it('should get all pets', () =>
    request(Server)
      .get('/api/v1/pets')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an.an('array');
      }));

  it('should add a new pet', () =>
    request(Server)
      .post('/api/v1/pets')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should get an pet by id', () =>
    request(Server)
      .get('/api/v1/pets/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an.an('object')
          .that.has.property('name')
          .equal('test');
      }));
});
