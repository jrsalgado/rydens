'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'driversCtrls', 'model.user', 'Promise'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel, Promise) {
  chai.use(chaiAsPromised);
  chai.should();
  
  describe('/driver', function () {
    var req, res;
    describe('GET /driver', function () {
      var user1, user2;
      before(function(done){
        var laurita, chalino;
        
        UserModel.remove({}, function(err){});
        
        laurita = mocks.users.good[0];
        laurita.driver = true;
        chalino = mocks.users.good[1];
        chalino.driver = true;
        
        Promise.map([laurita, chalino], function(user){
          var newUser = new UserModel(user);
          return newUser.saveAsync();
        })
        .then(function(){
          return done();
        });
        
      });
      it('should be an Array of drivers', function () {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.fetchAllDrivers(req, res).should.eventually.be.an('array').and.to.have.length(2);
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
    
    describe('PATCH /driver/set/:id', function (done) {
      var user1;
      before(function(done){
        UserModel.remove({}, function(err){
        });
        user1 = new UserModel(mocks.users.good[0]);
        user1.save(function(err, user){
          done();
        });
      });

      it('should not be rejected and set as driver', function (done) {
        req = httpMocks.createExpressRequest({
          params : { id: user1['_id'] }
        });
        res = httpMocks.createExpressResponse();
        middleware.setAsDriver(req, res)
        .should.be.fulfilled
        .and.eventually.to.have.property("driver").equals(true)
        .notify(done);
      });

      it('should be rejected if user not found', function (done){
        req = httpMocks.createExpressRequest({
          params:{ id: "344332234422331123456778" }
        });
        res = httpMocks.createExpressResponse();
        middleware.setAsDriver(req, res)
        .should.be.rejected.notify(done);
      });
    });
    
    describe.skip('PATCH /driver/unset/:id', function () {
    });
    
  });
}
