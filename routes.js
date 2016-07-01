var pg = require('pg');
var routesTools = require('./helpers/routesTools');
var auth = require('./middlewares/auth');

module.exports = function(app){
  app.get('/results',auth.auth,function(req,res,next){
    var tables = ['question1','question2','question3','question4','question5',
                  'question5_other','venue_recs','committee_volunteers'];
    var results = new Object();
    var resultsCount = 0;

    var client = new pg.Client(process.env.DATABASE_URL);
    client.connect(function(err){
      if(err){
        throw err;
      }

      tables.forEach(function(table){
        routesTools.getResults(table,client,results,function(result){
          switch(table) {
            case 'question1':
              req.question1 = result;
              break;
            case 'question2':
              req.question2 = result;
              break;
            case 'question3':
              req.question3 = result;
              break;
            case 'question4':
              req.question4 = result;
              break;
            case 'question5':
              req.question5 = result;
              break;
            case 'question5_other':
              req.question5_other = result;
              break;
            case 'venue_recs':
              req.venue_recs = result;
              break;
            case 'committee_volunteers':
              req.com_vols = result;
              break;
          }
          resultsCount++;
          if(resultsCount === tables.length) {
            client.end(function(err){
              if(err){
                throw err;
              }
            });
            next();
          }
        });
      });
    });
  },function(req, res){
    res.render('pages/results',{
      question1: req.question1,
      question2: req.question2,
      question3: req.question3,
      question4: req.question4,
      question5: req.question5,
      question5Other: req.question5_other,
      venueRecs: req.venue_recs,
      comVols: req.com_vols
    });
  });

  app.post('/',function(request,response){
    var q1 = request.body.q1,
    q2 = request.body.q2,
    q3 = request.body.q3,
    q4 = request.body.q4,
    q5 = request.body.q5,
    q5other = request.body.q5O;
    q6 = request.body.q6,
    q7 = request.body.q7;

    var queryQ1, queryQ2, queryQ3 = [], queryQ4, queryQ5 = [], queryQ5Other = [],
    queryQ6,queryQ7;

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
    if(typeof q7 !== 'undefined') {
      if(q7 !== 'b') {
        queryQ7 = 'INSERT INTO committee_volunteers VALUES ($$'+q7.name+
          '$$,$$'+q7.email+'$$)';
      }
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
      if(typeof queryQ7!== 'undefined'){
        client.query(queryQ7,function(err,result){
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

  app.get('/', auth.auth, function(request,response) {
    response.render('pages/index');
  });
}
