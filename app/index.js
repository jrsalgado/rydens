/*global process*/
'use strict';

module.exports= appRun;

function appRun(app, bodyParser ,usersRouter, motoristsRouter, morgan ,uuid, methodOverride){
  
  // Logger token
  morgan.token('id', function getId(req) {
    return req.id
  });
  
  app.use(assignId);
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(morgan('dev'));
  app.use('/motorists', motoristsRouter);
  app.use('/users', usersRouter);
  app.use('*', function(req, res, next){
    var err = new Error();
    err.status = 404;
    next(err);
  });
  app.use(errorNotFound);
    
  app.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  
  function assignId(req, res, next){
    req.id = uuid.v4();
    next();
  }

  return app;
  
}
  
function errorNotFound(err, req, res, next){
  if(err.status !== 404){
    return next();
  }
  res.status(404).send(err.message || "still no magic!!");
}