import React from 'react';
import { Line } from 'react-chartjs-2';

function HistoryGraph({ history }) {

  const chartData = {
    labels: history.slice().reverse().map(x => x.timestamp),
    datasets: [
      {
        label: "Close",
        data: history.slice().map(x => x.close),
        lineTension: 0.4,
        backgroundColor: "rgba(26,175,208,0.4)",
        borderColor: "rgba(26,175,208,1)",
        borderCapStyle: "round",
        borderJoinStyle: "square",
        pointBorderColor: "rgba(26,175,208,1)",
        pointBackgroundColor: "#eee",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(26,175,208,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        pointHitRadius: 1,
        fill: true,
      }
    ]
  };

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: "Closing Price",
      fontSize: 24,
      fontColor: "#333333"
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItem, data) {
          return tooltipItem[0].xLabel.format("DD/MM/YYYY");;
        },
        label: function(tooltipItem, data) {
          return "$" + tooltipItem.value;
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
          callback: function(label, index, labels) {
            return label.format("DD/MM/YYYY");
          }
        },
        scaleLabel: {
          display: true,
          fontSize: 18,
          labelString: "Day",

        }
      }],
      yAxes: [{
        position: "left",
        scaleLabel: {
          display: true,
          fontSize: 18,
          labelString: "($)",
        }
      }]
    },
    maintainAspectRatio: true,
    responsive: true
  }

  return (
    <div className="content-container">
      <div className="content-container__graph">
        <Line 
          data={chartData} 
          options={options}
        /> 
      </div>
    </div>
  );
  
};

export default HistoryGraph;