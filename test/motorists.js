'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'motoristsMiddlewares', 'UserModel', 'Promise'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel, Promise) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('/motorist', function () {
    var req, res;
    describe('GET /motorist', function () {
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
      
      it('should be an Array of motorists', function () {
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.fetchAllMotorists(req, res)
        .should.eventually.be.an('array')
        .and.to.have.length(2);
      });
    });
    
    describe.only('GET /motorist/:id', function () {
      var user1;
      before(function before(){
        return UserModel.removeAsync({})
        .then(function(){
          return new UserModel(mocks.users.full[0])
          .saveAsync().then(function(user){
            user1 = user;
          });
        });
      });
      
      after(function after(){
        return UserModel.removeAsync({});
      });
      
      it('should return motorist object', function () {
        var req, res;
        
        req = httpMocks.createExpressRequest({
          params:{id: user1.id }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.getById(req, res)
        .should.eventually.to.be.an.instanceof(UserModel);
      });
      
    });
    
    describe.skip('GET /motorist/:id/location', function () {
      it('should not be rejected', function(){
        
      });
    });
    
    describe.skip('PATCH /motorist/:id/location', function () {
      
      it('should be resolved when body is correct', function(){
        
      });
      
      it('should be rejected when missing elements in body', function () {
        
      });
    });
    
    describe('PATCH /motorist/set/:id', function () {
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

      it('should be fulfilled and set as motorist', function () {
        var req = httpMocks.createExpressRequest({
          params : { id: user1['_id'] }
        });

        var res = httpMocks.createExpressResponse();

        return middleware.setAsMotorist(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:1, n:1});
      });

      it('should be fulfilled and not modify any other', function (){
        req = httpMocks.createExpressRequest({
          params:{ id: "344332234422331123456778" }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsMotorist(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:0, n:0});
      });
    });
    
    describe.skip('PATCH /motorist/unset/:id', function () {
    });
    
  });
}
