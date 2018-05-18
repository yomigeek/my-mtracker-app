const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../app').default.default;

const should = chai.should();

chai.use(chaiHttp);

// Test user request API/functions
describe('User request API Tests', () => {
  it('should list ALL on /api/v1/users/requests GET', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.data.should.have.property('requests');

        done();
      });
  });

  it('should list a SINGLE request on /api/v1/users/requests/:requestId GET', (done) => {
    chai.request(server)
      .get(`/api/v1/users/requests/${31065}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        res.body.data.should.have.property('requests');
        res.body.data.requests.should.have.property('id');

        done();
      });
  });

  it('should return fail when using non-existing id on /api/v1/users/requests/:requestId GET', (done) => {
    chai.request(server)
      .get(`/api/v1/users/requests/${31}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should add a SINGLE request on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt cable in office', description: 'Cable in office B is faulty', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        res.body.data.should.have.property('requests');

        done();
      });
  });

  it('should fail on empty title on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: '', description: 'Cable in office B is faulty', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on title less than 10 characters on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt', description: 'Cable in office B is faulty', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on empty description on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt office cable', description: '', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on description less than 10 characters on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt office cable', description: 'The', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on empty priority value on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt office cable', description: 'The office cable is bad', priority: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on priority value not equal to either low, high or medium on /api/v1/users/requests POST', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({ title: 'Burnt office cable', description: '', priority: 'higher' })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'Burnt cable in office', description: 'Cable in office B is faulty', priority: 'high' })
          .end((error, response) => {
            response.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.status.should.equal('success');
            res.body.data.should.have.property('requests');

            done();
          });
      });
  });

  it('should fail on empty title on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: '', description: 'Cable in office B is faulty', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on title less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'the', description: 'Cable in office B is faulty', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on empty description on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'the office cable', description: '', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on description less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'the office cable', description: 'Cable', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on empty priority on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'the office cable', description: 'Cable in office B is faulty', priority: '' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });


  it('should fail on priority not equal to either low, high or medium on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(server)
          .put(`/api/v1/users/requests/${31065}`)
          .send({ title: 'the office cable', description: 'Cable in office B is faulty', priority: 'midi' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });
});

