/*global process*/
'use strict';

module.exports= appRun;

function appRun(app, bodyParser ,usersRouter, motoristsRouter){
  console.log('motoristsRouter', motoristsRouter);
  app.use(bodyParser.json());
  app.use('/motorists', motoristsRouter);
  app.use('/users', usersRouter);
  
  app.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return app;
}