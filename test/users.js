'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'usersMiddlewares'];

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
      it('should return an Array', function () {
        return middleware.fetchAllUsers(req, res).should.eventually.be.an('array');
      });
    });

    describe('POST /users', function () {
      var body = mocks.users;
      it('should return a new user', function () {
        var laurita =  body.good[0];
        req = httpMocks.createExpressRequest({ body: laurita });
        res = httpMocks.createExpressResponse();
        
        return middleware.saveNewUser(req, res).
        should.eventually.be.fulfilled
        .and.to.include(laurita);
      });
      
      it('should be rejected when missing elements in body', function () {
        req = httpMocks.createExpressRequest({ body: body.missing });
        res = httpMocks.createExpressResponse();
        
        return middleware.saveNewUser(req, res).should.eventually.be.rejected;
      });

    });

  });
}
