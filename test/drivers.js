'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'driversMiddlewares', 'UserModel', 'Promise'];
//Todo: change driver variable
function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel, Promise) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('/driver', function () {
    var req, res;
    describe('GET /driver', function () {
      before(function before(){
        return UserModel.removeAsync({})
          .then(function () {
            return Promise.map([mocks.users.full[0], mocks.users.full[1]], function (user) {
              var newUser = new UserModel(user);
              return newUser.saveAsync();
            });
          })
      });
      
      after(function after(){
       return  UserModel.removeAsync({});
      });
      
      it('should be an Array of drivers', function () {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.fetchAllDrivers(req, res)
        .should.eventually.be.an('array')
        .and.to.have.length(2);
      });
    });
    
    describe.skip('GET /driver/:id', function () {      
      it('should return driver object', function () {
        
      });
      
      it(('should Not be rejected'), function(){
        
      });
      
    });
    
    describe.skip('GET /driver/:id/location', function () {
      it('should not be rejected', function(){
        
      });
    });
    
    describe.skip('PATCH /driver/:id/location', function () {
      
      it('should be resolved when body is correct', function(){
        
      });
      
      it('should be rejected when missing elements in body', function () {
        
      });
    });
    
    describe('PATCH /driver/set/:id', function () {
      var user1;
      before(function(){
        
        return UserModel.removeAsync({})
        .then(function(){
          return new UserModel(mocks.users.good[0])
          .saveAsync();
        }).then(function(user){
          user1 = user;
        });
        
      });
      
      after(function(){
        return UserModel.removeAsync({});
      });

      it('should be fulfilled and set as driver', function () {
        var req = httpMocks.createExpressRequest({
          params : { id: user1['_id'] }
        });

        var res = httpMocks.createExpressResponse();

        return middleware.setAsDriver(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:1, n:1});
      });

      it.skip('should be fulfilled and not modify any other', function (){
        req = httpMocks.createExpressRequest({
          params:{ id: "344332234422331123456778" }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsDriver(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:0, n:0});
      });
    });
    
    describe.skip('PATCH /driver/unset/:id', function () {
    });
    
  });
}
