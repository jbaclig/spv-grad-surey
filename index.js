var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var app = express();
var pg = require('pg');

app.set('port',(process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var checkCredentials = function(username,password,route,callback){
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
      console.log('result.rows[0]: '+result.rows[0]);
      if(typeof result.rows[0] !== 'undefined') {
        console.log('results returned!');
        return callback(true);
      }
      else {
        console.log('no results returned...');
        return callback(false);
      }
    });
  });
}

/*var auth = function(req,res,next){
  var user = basicAuth(req);
  if(!user||!user.name||!user.pass){
    res.set('WWW-Authenticate','Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  var passwordQuery = "SELECT * FROM access WHERE password=crypt('"+
                      user.pass+ "',password);";

  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query(passwordQuery,function(err,result){
      if(user.name==='spv17'&&result.rows.length===1&&(result.rows[0]).page==='home'){
        next();
      }
      else {
        res.set('WWW-Authenticate','Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
      }
    });
  });
}*/

var auth = function(req,res,next) {
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

  checkCredentials(user.name,user.pass,route,function(result){
    console.log('checkCredentials result: '+result);
    if(result){
      console.log('next function');
      next();
    }
    else {
      console.log('unauthorized');
      return unauthorized(res);
    }
  });
}



app.get('/results', auth, function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question1',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question1 = result.rows;
        next();
      }

    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question2',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question2 = result.rows;
        next();
      }
    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question3',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question3 = result.rows;
        next();
      }
    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question4',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question4 = result.rows;
        next();
      }
    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question5',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question5 = result.rows;
        next();
      }
    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM question5_other',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.question5_other = result.rows;
        next();
      }
    });
  });
},function(request, response, next){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    client.query('SELECT * FROM venue_recs',function(err,result){
      done();
      if(err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        request.venue_recs = result.rows;
        next();
      }
    });
  });
},function(request, response){
  response.render('pages/results',{
    question1: request.question1,
    question2: request.question2,
    question3: request.question3,
    question4: request.question4,
    question5: request.question5,
    question5Other: request.question5_other,
    venueRecs: request.venue_recs
  });
});

app.post('/',function(request,response){
  console.log(request.body);
  var q1 = request.body.q1,
  q2 = request.body.q2,
  q3 = request.body.q3,
  q4 = request.body.q4,
  q5 = request.body.q5,
  q5other = request.body.q5O;
  q6 = request.body.q6;

  var queryQ1, queryQ2, queryQ3 = [], queryQ4, queryQ5 = [], queryQ5Other = [],
  queryQ6;

  if(typeof q1 !== 'undefined') {
    queryQ1 = 'UPDATE question1 SET ' + q1 + '=' + q1 + '+1 WHERE id=1'
  }
  if(typeof q2 !== 'undefined') {
    queryQ2 = 'UPDATE question2 SET ' + q2 + '=' + q2 + '+1 WHERE id=1'
  }
  if(typeof q3 !== 'undefined') {
    q3.forEach(function(value,key){
      queryQ3.push('UPDATE question3 SET ' + value + '=' + value + '+1 WHERE id=1');
    });
  }
  if(typeof q4 !== 'undefined') {
    queryQ4 = 'UPDATE question4 SET ' + q4 + '=' + q4 + '+1 WHERE id=1'
  }
  if(typeof q5 !== 'undefined'){
    q5.forEach(function(value,key){
      queryQ5.push('UPDATE question5 SET ' + value + '=' + value + '+1 WHERE id=1');
    });
  }
  if(typeof q5other !== 'undefined'){
    queryQ5Other = 'INSERT INTO question5_other VALUES ($$'+q5other+'$$)';
  }
  if(q6.length === 1){
    queryQ6 = 'INSERT INTO venue_recs VALUES ($$'+q6[0]+'$$)';
  }
  else if (q6.length === 2){
    queryQ6 = 'INSERT INTO venue_recs VALUES ($$'+q6[0]+'$$,$$'+q6[1]+'$$)';
  }

  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    if(typeof queryQ1 !== 'undefined'){
      client.query(queryQ1,function(err,result){
        done();
        if(err){
          console.error(err);
          response.send("Error " + err);
        }
      });
    }
    if(typeof queryQ2 !== 'undefined'){
      client.query(queryQ2,function(err,result){
        done();
        if(err){
          console.error(err);
          response.send("Error " + err);
        }
      });
    }
    if(typeof queryQ3 !== 'undefined'){
      queryQ3.forEach(function(value,key){
        client.query(value,function(err,results){
          done();
          if(err){
            console.error(err);
            response.send("Error " + err);
          }
        });
      });
    }
    if(typeof queryQ4 !== 'undefined'){
      client.query(queryQ4,function(err,result){
        done();
        if(err){
          console.error(err);
          response.send("Error " + err);
        }
      });
    }
    if(typeof queryQ5 !== 'undefined'){
      queryQ5.forEach(function(value,key){
        client.query(value,function(err,results){
          done();
          if(err){
            console.error(err);
            response.send("Error " + err);
          }
        });
      });
    }
    if(typeof queryQ5Other!== 'undefined'){
      client.query(queryQ5Other,function(err,result){
        done();
        if(err){
          console.error(err);
          response.send("Error " + err);
        }
      });
    }
    if(typeof queryQ6!== 'undefined'){
      client.query(queryQ6,function(err,result){
        done();
        if(err){
          console.error(err);
          response.send("Error " + err);
        }
      });
    }
    response.json(200);
  });
});

app.get('/', auth, function(request,response) {
  response.render('pages/index');
});

app.listen(app.get('port'),function(){
  console.log('Node app is running on port', app.get('port'));
});
