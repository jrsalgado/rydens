'use strict';
/*global describe, it, before, after, beforeEach, afterEach*/

module.exports = usersTest;
usersTest.$inject = ['chai', 'chai-as-promised', 'q', 'mocks', 'httpMocks', 'usersMiddlewares', 'UserModel'];

function usersTest(chai, chaiAsPromised, q, mocks, httpMocks, middleware, UserModel) {
  chai.use(chaiAsPromised);
  chai.should();

  describe('Users Middlewares', function () {
    describe('fetchAllUsers', function () {
      beforeEach(function () {

      });
      it('should return an Array', function () {
        var req, res;
        req = httpMocks.createExpressRequest();
        res = httpMocks.createExpressResponse();
        return middleware.fetchAllUsers(req, res).should.eventually.be.an('array');
      });
    });

    describe('saveNewUser', function () {
      var body = mocks.users;
      it('should return a new user', function () {
        var req, res, laurita =  body.good[0];
        req = httpMocks.createExpressRequest({ body: laurita });
        res = httpMocks.createExpressResponse();
        
        return middleware.saveNewUser(req, res)
        .should.eventually.be.fulfilled
        .and.to.include(laurita);
      });
      
      it('should be rejected when missing elements in body', function () {
        var req, res;
        req = httpMocks.createExpressRequest({ body: body.missing });
        res = httpMocks.createExpressResponse();
        
        return middleware.saveNewUser(req, res).should.eventually.be.rejected;
      });

    });
    
    
    describe('deleteUser', function () {
      var laurita;
      before(function(){
        laurita = new UserModel(mocks.users.good[0]);
        laurita.save();
      })
      it('should respond with the removed user', function () {
        var req, res;
        req = httpMocks.createExpressRequest({params:{id:laurita['_id']}});
        res = httpMocks.createExpressResponse();
        
        return middleware.deleteUser(req, res)
        .should.eventually.be.fulfilled
        .and.to.include(mocks.users.good[0]);
      });
    });
    
    describe('updateById', function () {
      var laurita;
      beforeEach(function(){
        return UserModel.removeAsync()
        .then(function(){
          return new UserModel(mocks.users.good[0])
          .saveAsync()
          .then(function(user){
            laurita = user;
          });
        });
      });
      
      afterEach(function(){
        return UserModel.removeAsync();
      })
      
      it('should modify user information', function(){
        var req, res;
        req = httpMocks.createExpressRequest({
          params:{id:laurita['_id']},
          body:{
            name:"maria",
            lastName:"latexana",
            edad:19
            }
          });
        res = httpMocks.createExpressResponse();
        return middleware.updateById(req, res)
        .should.eventually.to.include({n:1, nModified:1, ok:1})
      })
      
      it('should trhow an error if missing id', function(){
        var req, res;
        req = httpMocks.createExpressRequest({
          body:{
            name:"maria",
            lastName:"latexana",
            edad:19
            }
          });
        res = httpMocks.createExpressResponse();
        return middleware.updateById.bind(middleware, req, res)
        .should.throw("id is missing");
      });
      
    });

  });
}
