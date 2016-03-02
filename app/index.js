/*global process*/
'use strict';

module.exports= appRun;

function appRun(app, bodyParser ,usersRouter, motoristsRouter, morgan ,uuid){
  // Logger token
  
  morgan.token('id', function getId(req) {
    return req.id
  });
  
  app.use(bodyParser.json());
  app.use(assignId);
  app.use(morgan('dev'));
  app.use('/motorists', motoristsRouter);
  app.use('/users', usersRouter);
  
  app.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return app;
  
  function assignId(req, res, next){
    req.id = uuid.v4();
    next();
  }
  
}