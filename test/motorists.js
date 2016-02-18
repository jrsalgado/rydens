'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'motoristsMiddlewares', 'UserModel', 'Promise'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel, Promise) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('Motorists Middlewares', function () {
    describe('fetchAllMotorists', function () {
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
        var req, res;
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.fetchAllMotorists(req, res)
        .should.eventually.be.an('array')
        .and.to.have.length(2);
      });
    });
    
    describe('getById', function () {
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
      
      it('should throw and error while missing id', function () {
        var req, res;
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        return middleware.getById.bind(middleware,req, res)
        .should.throw('id is missing');
      });
      
    });
    
    describe('setLocationById', function () {
      var user1;
      beforeEach(function(){
        return UserModel.removeAsync()
        .then(function(){
          return new UserModel(mocks.users.full[0]).saveAsync()
          .then(function(user){
            return user1 = user;
          })
          .catch(function(err){
            return err;
          });
        })
      });
      
      after(function(){
        return UserModel.removeAsync()
      });
      
      it('should change the motorist location', function(){
        var req, res;
        
        req = httpMocks.createExpressRequest({
          params:{id: user1.id },
          body:{coordinates:{
            latitude: -111.0249045,
            longitude: 29.0973134
          }}
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setLocationById(req, res)
        .should.eventually.be.an('object')
        .and.to.be.deep.equal({'n':1, 'nModified':1, 'ok':1})
      });
      
      it('should trhow error when empty coordinates ', function(){
        var req, res;
        
        req = httpMocks.createExpressRequest({
          params:{id: user1.id },
          body:{coordinates:{}}
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setLocationById.bind(middleware,req, res)
        .should.throw("required coordinates");
      });
      
    });
    
    describe('setAsMotorist', function () {
      var user1;
      beforeEach(function(){
        
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
        var req, res;
        req = httpMocks.createExpressRequest({
          params:{ id: "344332234422331123456778" }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsMotorist(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:0, n:0});
      });
      
      it('should throw an error if id is missing', function (){
        var req, res;
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.setAsMotorist.bind(middleware, req, res)
        .should.throw("id is missing");
      });
      
    });
    
    describe('unsetAsMotorist', function () {
      var user1;
      beforeEach(function(){
        return UserModel.removeAsync({})
        .then(function(){
          return new UserModel(mocks.users.full[0])
          .saveAsync();
        }).then(function(user){
          user1 = user;
        });
      });
      
      after(function(){
        return UserModel.removeAsync({});
      });
      
      it('should set as false driver element', function () {
        var req, res;
        req = httpMocks.createExpressRequest({
          params : { id: user1['_id'] }
        });
        res = httpMocks.createExpressResponse();
        
        return middleware.unsetAsMotorist(req, res)
        .should.eventually.be.fulfilled
        .and.to.include({ok:1, nModified:1, n:1})
      });
      
      it('should trhow Error while missing id', function (){
        var req, res;
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        
        return middleware.unsetAsMotorist.bind(middleware,req, res)
        .should.throw("id is missing")
      });
      
    });
  });
}
