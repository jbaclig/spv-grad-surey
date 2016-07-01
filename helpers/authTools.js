var pg = require('pg');

module.exports = {
  checkCredentials: function(username,password,route,callback){
    var client = new pg.Client(process.env.DATABASE_URL);
    client.connect(function(err){
      if(err){
        throw err;
      }

      var passwordQuery = "SELECT * FROM access WHERE password=crypt('"+
                          password+ "',password) AND username='"+
                          username+"' AND page='"+route+"';";

      client.query(passwordQuery,function(err,result){
        client.end(function(err){
          if(err){
            throw err;
          }
        });
        if(err){
          throw err;
        }

        if(typeof result.rows[0] !== 'undefined') {
          return callback(true);
        }
        else {
          return callback(false);
        }
      });
    });
  }
}
