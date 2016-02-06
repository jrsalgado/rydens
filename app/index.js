/*global process*/
'use strict';

module.exports= app;
app.$inject = ['express', 'users.router'];

function app(express, usersRouter){
  var v1 = express();
  v1.use('/users', usersRouter);
  v1.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return v1;
}