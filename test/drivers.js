'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'drivers.controllers'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware) {
  chai.use(chaiAsPromised);
  chai.should();
  
  describe('/driver', function () {
    var req, res;
    describe('GET /driver', function () {
      it('should be an Array of drivers', function (done) {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        middleware.fetchAllDrivers(req, res).should.eventually.be.an('array').notify(done)
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
    
    describe.skip('PATCH /driver/set/:id', function () {
      
    });
    
    describe.skip('PATCH /driver/unset/:id', function () {
      
    });
    
  });
}
