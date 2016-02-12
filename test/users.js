'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'httpMocks', 'users.controllers'];

function usersTest(chai, chaiAsPromised, q, httpMocks, middleware) {

  describe('/users', function () {
    var req, res;
    chai.use(chaiAsPromised);
    chai.should();

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
      var newUser={};
      before(function(){
        newUser.good = {
          name: "laurita",
          lastName: "garza",
          age: 24
        };
        newUser.missing = {
          name: "popeye",
          lastName: "marino"
        };
      });
      it('should return a New Object', function (done) {
        req = httpMocks.createExpressRequest({ body: newUser.good });
        res = httpMocks.createExpressResponse();
        middleware.saveNewUser(req, res).should.eventually.be.an('object').notify(done);
      });
      
      it('should be rejected when missing elements in body', function (done) {
        req = httpMocks.createExpressRequest({ body: newUser.missing });
        res = httpMocks.createExpressResponse();
        middleware.saveNewUser(req, res).should.eventually.be.rejected.notify(done);
      });

    });

  });
}
