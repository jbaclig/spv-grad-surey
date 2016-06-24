$('#form-submit').on('click',submitSurvey);

function submitSurvey(event){
  event.preventDefault();

  var response = {
    'q1': $('input[name="q1-group"]:checkced').val(),
    'q2': $('input[name="q2-group"]:checked').val()
  }

  $.ajax({
    type: 'POST',
    data: response,
    url:'/',
    dataType: 'JSON'
  }).done(function(response){
    if(response.msg ===''){
      alert('survey submitted (form.js)');
    }
    else {
      alert('Error: ' + response.msg);
    }
  });
};
