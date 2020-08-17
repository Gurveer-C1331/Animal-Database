const electron = require('electron');
const animal_selected = electron.remote.getGlobal("animal_selected");
const default_map_data = electron.remote.getGlobal("default_map_data");
const geochart_element = document.getElementById("regions_div");
const antarctica_element = document.getElementById("map-antarctica");

//recieve animal data
async function getAnimal() {
  const response = await fetch("http://127.0.0.1:5000/getAnimal", {
    method: "POST",
    body: JSON.stringify(animal_selected),
    cache: "no-cache",
    headers: {
      "content-type": "application/json"
    }
  });
  const data = await response.json();
  //displaying information onto the page
  var name = document.getElementById("name");
  name.innerHTML = data[0].toUpperCase();
  var class_ = document.getElementById("class");
  class_.innerHTML = data[1].toUpperCase();
  var diet = document.getElementById("diet");
  diet.innerHTML = data[2].toUpperCase();
  var status = document.getElementById("status");
  status.innerHTML = data[3].toUpperCase();
  var image = document.getElementById("animal_image");
  image.src = "../assets/images/animal_images/"+data[5];
  return data;
}

google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyAWIaKJsVrtIJzDbOfdFzjzf7zI3rOZSPA'
});
google.charts.setOnLoadCallback(drawRegionsMap);

//drawing geochart (awaits for the fetch that occurs in getAnimal())
async function drawRegionsMap() {
  const animal_data = await getAnimal();
  const range = animal_data[4];
  //replacing the geochart with map of antarctica
  if (range[0] == "Antarctica") {
    geochart_element.classList.toggle("no-display");
    antarctica_element.classList.toggle("no-display");
  }
  var data = google.visualization.arrayToDataTable(default_map_data);
  //adds 1 to all the countries in data that are in animal's range
  range.forEach(element => {
    for (i = 0; i < data.fg.length; i++) {
      var row = data.fg[i]["c"];
      if (row[0]["v"].toUpperCase() == element.toUpperCase()) row[1]["v"] = 1;
    }
  });
  var options = { 
    legend: "none",
    defaultColor: "#F2F2F2",
    datalessRegionColor: "none", //#F2F2F2
    backgroundColor: "none",
    colorAxis: {colors: ["#FFFFFF", "2BAE66"]}
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
if (event.srcElement.tagName == "LI") {
  window.location.href = event.srcElement.children[0].href;
}
});


