'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'driversMiddlewares', 'UserModel', 'Promise'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel, Promise) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('/driver', function () {
    var req, res;
    describe('GET /driver', function () {
      before(function(){
        var laurita, chalino;
        
        UserModel.remove({}, function(err){});
        
        laurita = mocks.users.good[0];
        laurita.driver = true;
        chalino = mocks.users.good[1];
        chalino.driver = true;
        
        return Promise.map([laurita, chalino], function(user){
          var newUser = new UserModel(user);
          return newUser.saveAsync();
        });
        
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
      before(function(done){
        UserModel.remove({}, function(err){
        });
        user1 = new UserModel(mocks.users.good[0]);
        user1.save(function(err, user){
          done();
        });
      });

      it('should be fulfilled and set as driver', function () {
        req = httpMocks.createExpressRequest({
          params : { id: user1['_id'] }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsDriver(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:1, n:1});
      });

      it.only('should be fulfilled and not modify any other', function (){
        req = httpMocks.createExpressRequest({
          params:{ id: "344332234422331123456778" }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsDriver(req, res)
        .should.be.fulfilled
        .and.to.include({ok:1, nModified:0, n:0});
      });
    });
    
    describe.skip('PATCH /driver/unset/:id', function () {
    });
    
  });
}
