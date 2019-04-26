<template>
  <div>
    <div class="chart-container">
      <canvas id="scoreChart" width="300" height="150"></canvas>
    </div>
    <div id="scoreTableDiv">
      <table v-show="showTable" id="scoreTable" class="table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Social Media</th>
            <th>Grade</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "history",
  data() {
    return {
      showTable: false
    };
  },
  mounted() {
    let self = this;
    this.$http
      .get("http://localhost:3000/score/all/" + this.$cookies.get("session_id"))
      .then(function(data) {
        // retrieve user settings
        let scores = data.data.scores;
        self.populateTable(scores);
        let datasets = self.chartDataParser(scores);
        for (let i = 0; i < datasets.length; i++) {
          datasets[i].label = self.assignScoreType(i);
          datasets[i].fill = false;
          datasets[i].tension = 0;
          let colours = self.assignLineColour(i);
          if (colours) {
            datasets[i].backgroundColor = colours.backgroundColor;
            datasets[i].borderColor = colours.borderColor;
          }
        }
        let usableDatasets = datasets.filter(a => a.data.length !== 0);
        let config = self.buildGraphConfig(usableDatasets);
        let ctx = document.getElementById("scoreChart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      });
  },
  methods: {
    chartDataParser(data) {
      let datasets = [
        { data: [] },
        { data: [] },
        { data: [] },
        { data: [] },
        { data: [] }
      ]; // length of 5 being set for the number of score types that we will support
      for (let i = 0; i < data.length; i++) {
        let score = data[i];
        datasets[score.type_id].data.push({
          x: score.time,
          y: 100 - score.score
        });
      }
      return datasets;
    },

    assignScoreType(scoreTypeId) {
      if (scoreTypeId === 1) {
        return "Cumulative Score";
      } else if (scoreTypeId === 2) {
        return "Twitter";
      } else if (scoreTypeId === 3) {
        return "Facebook";
      } else if (scoreTypeId === 4) {
        return "Instagram";
      } else {
        return "DNE";
      }
    },

    assignLineColour(scoreTypeId) {
      if (scoreTypeId === 1) {
        // Cumulative Score (Red)
        return {
          backgroundColor: "rgb(142,68,172)",
          borderColor: "rgb(142,68,172)"
        };
      } else if (scoreTypeId === 2) {
        // Twitter (twitter icon blue)
        return {
          backgroundColor: "rgb(29,161,242)",
          borderColor: "rgb(29,161,242)"
        };
      } else if (scoreTypeId === 3) {
        // Facebook (facebook logo blue)
        return {
          backgroundColor: "rgb(60,92,169)",
          borderColor: "rgb(60,92,169)"
        };
      } else if (scoreTypeId === 4) {
        // Instagram (instagram logo reddy-purple)
        return {
          backgroundColor: "rgb(158,71,108)",
          borderColor: "rgb(158,71,108)"
        };
      }
    },

    buildGraphConfig(datasets) {
      let yLabels = {
        100: "A+",
        89: "A  ",
        84: "A- ",
        79: "B+",
        74: "B  ",
        69: "B- ",
        64: "C+",
        59: "C  ",
        54: "C- ",
        49: "D+",
        44: "D  ",
        39: "D- ",
        34: "F  "
      };
      let config = {
        type: "line",
        data: {
          datasets: datasets
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Grade History",
            fontSize: 32
          },
          tooltips: {
            mode: "index",
            intersect: true
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          legend: {
            labels: {
              fontSize: 18
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                type: "time",
                fontSize: 32,
                scaleLabel: {
                  display: true,
                  labelString: "Time"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Grade"
                },
                ticks: {
                  suggestedMin: 34,
                  suggestedMax: 100,
                  stepSize: 1,
                  callback: function(value) {
                    return yLabels[value];
                  }
                }
              }
            ]
          }
        }
      };
      return config;
    },

    populateTable(data) {
      let table = document.getElementById("scoreTable");
      for (let i = 0; i < data.length; i++) {
        let row = table.insertRow(i + 1);
        let num = row.insertCell(0);
        let date = row.insertCell(1);
        let socialMedia = row.insertCell(2);
        let grade = row.insertCell(3);
        num.innerHTML = i;
        date.innerHTML = data[i].time;
        socialMedia.innerHTML = this.assignScoreType(data[i].type_id);
        grade.innerHTML = 100 - data[i].score;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_history.scss";
</style>
