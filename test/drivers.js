'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'drivers.controllers', 'model.user'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel) {
  chai.use(chaiAsPromised);
  chai.should();
  
  describe('/driver', function () {
    var req, res;
    describe('GET /driver', function () {
      it('should be an Array of drivers', function (done) {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        middleware.fetchAllDrivers(req, res).should.eventually.be.an('array').notify(done);
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
        user1 = new UserModel(mocks.users.good);
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
