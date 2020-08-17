var data = null;
var options = null;
var chart = null;
var country_selected = null;
const electron = require("electron");
const map_data = electron.remote.getGlobal("addPage_map_data");

google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyAWIaKJsVrtIJzDbOfdFzjzf7zI3rOZSPA'
});
google.charts.setOnLoadCallback(drawRegionsMap);

//drawing geochart
function drawRegionsMap() {
  //loads the same map data as the add page
  data = google.visualization.arrayToDataTable(map_data);

  options = { 
    legend: "none",
    defaultColor: "#F2F2F2",
    datalessRegionColor: "none", //#F2F2F2
    backgroundColor: "none",
    colorAxis: {colors: ["#F2F2F2", "2BAE66"]}
  };

  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

   //sets the country_selected variable to the country selected by the user
   google.visualization.events.addListener(chart, "select", function(event){
    var selection = chart.getSelection();
    if (selection.length) {
        country_selected = data.getValue(selection[0].row, 0);
    }
  });

  chart.draw(data, options);
}

const remote = electron.remote;
const ipc = electron.ipcRenderer;
const checkbox = document.getElementById("antarctica");
const plus_btn = document.getElementById("plus-button");
const minus_btn = document.getElementById("minus-button");
const done_btn = document.getElementById("done-button");

//sets the state of the checkbox based on the value in main.js
checkbox.checked = electron.remote.getGlobal("antarctica_selected");

//plus button
plus_btn.addEventListener("click", function(event) {
  //removes old row then adding a new row with new value
  data.removeRow(data.getFilteredRows([{column: 0, value: country_selected}])[0]);
  data.addRow([country_selected, 1]);
  chart.draw(data, options); //redrawing geochart
  event.preventDefault();
});

//minus button
minus_btn.addEventListener("click", function(event) {
  //removes old row then adding a new row with a new value
  data.removeRow(data.getFilteredRows([{column: 0, value: country_selected}])[0]);
  data.addRow([country_selected, 0]);
  chart.draw(data, options); //redrawing geochart
  event.preventDefault();
});

//done button
done_btn.addEventListener("click", function(event) {
  //getting map data from data
  var data_array = [["Country", "Population"]];
  for(i = 0; i < data.fg.length; i++){
    data_array[i+1] = data.fg[i];
  }
  //sends the map data to update addpage map data in main.js
  ipc.send("range-selector_map_data", data_array);
  //make updates to the selection of antarctica
  ipc.send("antarctica_changed", checkbox.checked);

  var window = remote.getCurrentWindow();
  window.close();

  event.preventDefault();
});