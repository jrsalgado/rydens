'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'users.controllers'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('/users', function () {
    var req, res;
    describe('GET /users', function () {
      beforeEach(function () {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
      });
      it('should return an Array', function (done) {
        middleware.fetchAllUsers(req, res).should.eventually.be.an('array').notify(done);
      });
    });

    describe('POST /users', function () {
      var body = mocks.users;
      it('should return a New Object', function (done) {
        req = httpMocks.createExpressRequest({ body: body.good[0] });
        res = httpMocks.createExpressResponse();
        middleware.saveNewUser(req, res).should.eventually.be.an('object').notify(done);
      });
      
      it('should be rejected when missing elements in body', function (done) {
        req = httpMocks.createExpressRequest({ body: body.missing });
        res = httpMocks.createExpressResponse();
        middleware.saveNewUser(req, res).should.eventually.be.rejected.notify(done);
      });

    });

  });
}
