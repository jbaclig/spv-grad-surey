$('#survey-submit').on('click',submitSurvey);

function submitSurvey(event){
  event.preventDefault();

  var q3answers = [];
  $('input[name="q3-group"]:checked').each(function(){
    q3answers.push($(this).attr('value'));
  });

  var q5answers = [];
  $('input[name="q5-group"]:checked').each(function(){
    q5answers.push($(this).attr('value'));
  });

  var q5other;
  if($('#q5-d').is(':checked')) {
    q5other = $('#q5-other-text').val();
  }

  var q6answers = [];
  var q6venue = $('#q6-venue').val(), q6address = $('#q6-address').val();
  if(q6venue){
    q6answers.push(q6venue);
  }
  if(q6address){
    q6answers.push(q6address);
  }

  var committeeVolInfo;
  if($('input[name="q7-group"]:checked').val() === 'a'){
    committeeVolInfo = new Object();
    committeeVolInfo.name = $('#q7-name').val();
    committeeVolInfo.email = $('#q7-email').val();
  }
  else {
    committeeVolInfo = $('input[name="q7-group"]:checked').val();
  }

  var answers = JSON.stringify({
    q1: $('input[name="q1-group"]:checked').val(),
    q2: $('input[name="q2-group"]:checked').val(),
    q3: q3answers,
    q4: $('input[name="q4-group"]:checked').val(),
    q5: q5answers,
    q5O: q5other,
    q6: q6answers,
    q7: committeeVolInfo
  });

  //console.log(answers);

  $.ajax({
    type: 'POST',
    data: answers,
    url:'/',
    dataType: 'JSON',
    contentType: 'application/json'
  }).done(function(data){
    console.log(data);
  }).fail(function(xhr,textStatus,errorThrown){
    alert(errorThrown + xhr.responseText);
  });

  $('#grad-survey').trigger('reset');
};
