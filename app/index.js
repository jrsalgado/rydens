'use strict';

module.exports= app;
app.$inject = ['express', 'config'];

function app(express, config){
  console.log(config);
  var v1 = express();
  
  v1.get('/', function(req, res){
    res.send('main');
  });
  v1.listen(config.port, function(){
    console.log('listen port: '+ config.port);
  });
  return v1;
}