/*global process*/
'use strict';

module.exports= appRun;
appRun.$inject = ['app', 'bodyParser', 'users.router'];

function appRun(app, bodyParser ,usersRouter){
  
  app.use(bodyParser.json());
  app.use('/users', usersRouter);
  app.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return app;
}