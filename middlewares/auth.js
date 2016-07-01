var basicAuth = require('basic-auth');
var authTools = require('../helpers/authTools');

module.exports = {
  auth: function(req,res,next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate','Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }

    var user = basicAuth(req);

    if(!user || !user.name || !user.pass) {
      return unauthorized(res);
    }

    var route = 'home';
    if(req.route.path === '/results'){
      route = 'results';
    }

    authTools.checkCredentials(user.name,user.pass,route,function(result){
      if(result){
        next();
      }
      else {
        return unauthorized(res);
      }
    });
  }
}
