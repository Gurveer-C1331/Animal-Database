//retrieving map data
async function getMapData() {
  const response = await fetch("http://127.0.0.1:5000/map_data", {
    method: "GET"
  });
  const data = await response.json();
  var antarctica_pop = document.getElementById("antarctica-population");
  antarctica_pop.innerHTML = data[9][1];
  return data;
}

//retrieving piechart data
async function getPieChartData() {
  const response = await fetch("http://127.0.0.1:5000/piechart_data", {
    method: "GET"
  });
  const data = await response.json();
  return data;
}

//retrieving database population
fetch("http://127.0.0.1:5000/population", {
  method: "GET"
})
.then(response => response.json())
.then((data) => {
  //displaying the population number onto the page
  var pop_label = document.getElementById("population-text");
  pop_label.innerHTML = data;
})
.catch(error => console.error(error));

//loading google pakcages required
google.charts.load('current', {
    'packages':['geochart', 'corechart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAWIaKJsVrtIJzDbOfdFzjzf7zI3rOZSPA'
  });

//creating the geochart (awaiting for the fetch occuring in getMapData())
google.charts.setOnLoadCallback(drawRegionsMap);
async function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable(await getMapData());

  var options = { 
    legend: "none",
    defaultColor: "#F2F2F2",
    datalessRegionColor: "none", //#F2F2F2
    colorAxis: {colors: ["#F2F2F2", "2BAE66"]}
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

//creating the 3 piecharts (awating for the fetch occuring in getPirChartData())
google.charts.setOnLoadCallback(drawChart);
async function drawChart() {
  const data = await getPieChartData();
  //setting 2 data variables for each chart
  var diet_data = google.visualization.arrayToDataTable(data[0]);
  var class_data = google.visualization.arrayToDataTable(data[1]);
  var status_data = google.visualization.arrayToDataTable(data[2]);

  var options = {
    pieHole: 0.6,
    backgroundColor: "none",
    chartArea: {width: "100%", height: "100%"},
    colors: ["#2BAE66", "#3BCF7E", "#62D897", "#8AE2B1", "#B1ECCB", "#D8F5E5", "#FFFFFF"],
    legend: {alignment: "center", textStyle: {fontName: "Montserrat"}},
    pieSliceText: "none",
    sliceVisibilityThreshold: 0
  };
  //drawing all 3 charts
  var diet_chart = new google.visualization.PieChart(document.getElementById('diet-chart-div'));
  diet_chart.draw(diet_data, options);
  var class_chart = new google.visualization.PieChart(document.getElementById('class-chart-div'));
  class_chart.draw(class_data, options);
  var status_chart = new google.visualization.PieChart(document.getElementById('status-chart-div'));
  status_chart.draw(status_data, options);
}

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});