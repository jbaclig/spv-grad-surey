var pg = require('pg');

module.exports = {
  getResults: function(table,client,results,callback){
    var query = "SELECT * FROM " + table;
    client.query(query,function(err,result){
      if(err){
        throw err;
      }
      console.log(table+' result: '+result.rows);
      return callback(result.rows);
    });
  }
}
