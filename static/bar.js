// bar chart
var OlympicsData = {
  x: ["U.S.A.", "China", "R.O.C.", "Great Britain", "Japan", 
      "Australia", "Italy", "Germany", "Netherlands", "France"],
  y: [113, 88, 71, 65, 58, 46, 40, 37, 36, 33],
  type: "bar",
  marker: {
      color: ["#4980C4", "#fcb131", '#00a651', '#ee334e', '#000',"#4980C4", "#fcb131", '#00a651', '#ee334e', '#000']
  }
};

var data = [OlympicsData];

var layout = {
    yaxis: { 
        title: "Number of Medals",
    }
};

var config = {responsive: true}

Plotly.newPlot("bar", data, layout, config);
