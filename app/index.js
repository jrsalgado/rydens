/*global process*/
'use strict';

module.exports= app;
app.$inject = ['express'];

function app(express){
  var v1 = express();
  
  v1.get('/', function(req, res){
    res.send('main');
  });
  v1.listen(process.env.PORT, function(){
    console.log('listen port: '+ process.env.PORT);
  });
  return v1;
}