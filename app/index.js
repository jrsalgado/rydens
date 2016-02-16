/*global process*/
'use strict';

module.exports= appRun;

function appRun(app, bodyParser ,usersRouter, driversRouter){
  console.log('driversRouter', driversRouter);
  app.use(bodyParser.json());
  app.use('/drivers', driversRouter);
  app.use('/users', usersRouter);
  
  app.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return app;
}