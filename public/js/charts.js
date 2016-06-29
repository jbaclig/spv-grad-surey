var ctx1 = document.getElementById('chart-q1').getContext('2d');
var q1Chart = new Chart(ctx1,{
  type: 'bar',
  data: {
    labels: ['Lunch on Friday','Dinner on Friday','Dinner on Saturday'],
    datasets: [{
      label: 'Votes',
      data: [question1[0].a,question1[0].b,question1[0].c],
      backgroundColor: [
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(255,159,64,0.2)'
      ],
      borderColor:[
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx2 = document.getElementById('chart-q2').getContext('2d');
var q2Chart = new Chart(ctx2,{
  type: 'bar',
  data: {
    labels: ['$15 - $25','$25 - $50'],
    datasets: [{
      label: 'Votes',
      data: [question2[0].a,question2[0].b],
      backgroundColor: [
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)'
      ],
      borderColor:[
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx3 = document.getElementById('chart-q3').getContext('2d');
var q3Chart = new Chart(ctx3,{
  type: 'bar',
  data: {
    labels: ['Spouse','8th grader\'s sibling','Grandparents','Others'],
    datasets: [{
      label: 'Votes',
      data: [question3[0].a,question3[0].b,question3[0].c,question3[0].d],
      backgroundColor: [
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(255,159,64,0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor:[
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx4 = document.getElementById('chart-q4').getContext('2d');
var q4Chart = new Chart(ctx4,{
  type: 'bar',
  data: {
    labels: ['1 - 5 people','6 - 10 people','More than 10 people'],
    datasets: [{
      label: 'Votes',
      data: [question4[0].a,question4[0].b,question4[0].c],
      backgroundColor: [
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(255,159,64,0.2)'
      ],
      borderColor:[
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx5 = document.getElementById('chart-q5').getContext('2d');
var q5Chart = new Chart(ctx5,{
  type: 'bar',
  data: {
    labels: ['Decorate','DJ','Photo Booth','Other'],
    datasets: [{
      label: 'Votes',
      data: [question5[0].a,question5[0].b,question5[0].c,question5[0].d],
      backgroundColor: [
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(255,159,64,0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor:[
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
