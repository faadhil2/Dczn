//results
const poll_obj = [
  { poll_name: 'sports', option: 'soccer', points: '19' },
  { poll_name: 'sports', option: 'ping pong', points: '18' },
  { poll_name: 'sports', option: 'basketball', points: '16' },
  { poll_name: 'sports', option: 'football', points: '15' },
  { poll_name: 'sports', option: 'tennis', points: '7' }
]

const canvas = $(`
<canvas id="pollResults" width="300px" height="auto" aria-label="Poll Results Chart" role="img"></canvas>
`);

//generates random hex colors for bar colors
const generateHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#'.concat(randomColor);
}

//assumes that the object being passed is the results from the getTitleAndPoints poll-query
const createPollResultsElement = function (obj) { //takes in poll table
  const labels = obj.map((el) => el.option);
  const totalPoints = obj.map((el) => el.points);
  const pollName = obj[0].poll_name;

  // generate hex colors to put in array for length of object
  const barChartColors = [];
  for (let i = 0; i < Object.keys(obj).length; i++) {
    barChartColors.push(generateHexColor());
  }

  // variables to use chart object
  const data = {
    labels,
    datasets: [
      {
        label: 'Points gained by Borda Count',
        backgroundColor: barChartColors,
        data: totalPoints
      }
    ]
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Poll Results for ' + pollName,
        fontSize: 30
      }
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
        scaleLabel: {
          display: true,
        }
      }]
    },
    indexAxis: 'y'
  }

  new Chart($('#pollResults'), {
    type: 'bar',
    data,
    options
  })

  return $pollElement;
}



$(document).ready(function () {

  // Create Poll Event Handlers
  $("#view-results").on("click", () => {

    $('.container').replaceWith(canvas);
    $('.container').append(createPollResultsElement(poll_obj));



    //Upon choice submission
    // onChoiceSubmit();
  })

})
