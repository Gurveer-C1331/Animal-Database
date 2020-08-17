var data = null;
var options = null;
var chart = null;
const electron = require('electron');
const default_map_data = electron.remote.getGlobal("default_map_data"); //grabbing map data from main.js

google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyAWIaKJsVrtIJzDbOfdFzjzf7zI3rOZSPA'
});
google.charts.setOnLoadCallback(drawRegionsMap);

//drawing the geochart
function drawRegionsMap() {
  data = google.visualization.arrayToDataTable(default_map_data);

  options = { 
    legend: "none",
    defaultColor: "#F2F2F2",
    datalessRegionColor: "#FFFFFF", //#F2F2F2
    backgroundColor: "none",
    colorAxis: {colors: ["#FFFFFF", "2BAE66"]}
  };

  chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}

const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
const class_dropdown_btn = document.getElementById("class-dropdown-button");
const class_dropdown_content = document.getElementById("class-dropdown-content");
const status_dropdown_btn = document.getElementById("status-dropdown-button");
const status_dropdown_content = document.getElementById("status-dropdown-content");
const add_btn = document.getElementById("add-button");
const clear_btn = document.getElementById("clear-button")
const info_container = document.getElementById("info-bar");
const map_btn = document.getElementById("map-button");

//antarctica set to false (as the default when first laoding)
ipc.send("antarctica_changed", false);

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});

//map input window
map_btn.addEventListener("click", function(event) {
  //send the current map data for this page (updating the addpage map data in main.js)
  var data_array = [["Country", "Population"]];
  for(i = 0; i < data.fg.length; i++){
    data_array[i+1] = data.fg[i];
  }
  ipc.send("add_map_data", data_array);

  let win = new BrowserWindow ({
    width: 1015,
    height: 791,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.on("close", function() {
    win = null 
  });
  win.loadFile("src/range_select.html");
  //win.webContents.openDevTools();
  win.show();
  event.preventDefault();
});

//class dropdown function
class_dropdown_btn.addEventListener("click", function(event) { //toggles the dropdown function
  class_dropdown_btn.classList.toggle("open");
  class_dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

class_dropdown_content.addEventListener("click", function(event) { //class clicked
  var class_clicked = event.srcElement.innerHTML;
  class_dropdown_btn.innerHTML = class_clicked;
  class_dropdown_btn.classList.toggle("open");
  class_dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

//status dropdown function
status_dropdown_btn.addEventListener("click", function(event) { //toggles the dropdown function
  status_dropdown_btn.classList.toggle("open");
  status_dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

status_dropdown_content.addEventListener("click", function(event) { //status clicked
  var status_clicked = event.srcElement.innerHTML;
  status_dropdown_btn.innerHTML = status_clicked;
  status_dropdown_btn.classList.toggle("open");
  status_dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

//add button
add_btn.addEventListener("click", function (event) {
  const input_data = [];
  //gathering all the input
  try {
    var name = document.getElementById("name-field").value;
    var diet = document.querySelector('input[name="diet"]:checked').value;
    var a_class = class_dropdown_btn.innerHTML;
    var status = status_dropdown_btn.innerHTML;
    var range = [];
    //adds antarctica in the range if its true (or been checked)
    if (electron.remote.getGlobal("antarctica_selected")) {
      range.push("Antarctica");
    }
    //finds all countries selected and adding it to range
    for (i = 0; i < data.fg.length; i++) {
      var row = data.fg[i]["c"];
      if (row[1]["v"] == 1) {
        range.push(row[0]["v"]);
      }
    }
    var image_path = document.getElementById("image-field").value;
    //checking for incomplete inputs
    if (name == "" || a_class == "SELECT" || status == "SELECT" || image_path == "") throw error
    else {
      input_data.push(name, diet, a_class, status, range, image_path);
      //sending data to check if the new entry is successful
      fetch("http://127.0.0.1:5000/creating_animal", {
        method: "POST",
        body: JSON.stringify(input_data),
        cache: "no-cache",
        headers: {
          "content-type": "application/json"
        }
      })
      .then(response => response.json())
      .then((data) => {
        if (data) { //displays the "correct" message
          info_container.classList.remove("no-display");
          info_container.querySelector("img").setAttribute("src", "../assets/images/checkmark.svg");
          info_container.querySelector("p").innerHTML = "Animal has been added to the database";
          event.preventDefault();
        }
        else { //displays the "incorrect" message
          info_container.classList.remove("no-display");
          info_container.querySelector("img").setAttribute("src", "../assets/images/x.svg");
          info_container.querySelector("p").innerHTML = "Animal already exists in the database";
          event.preventDefault();
        }
      })
      .catch(error => console.error(error));
    }
  }
  catch { //displays "incomplete" message
    info_container.classList.remove("no-display");
    info_container.querySelector("img").setAttribute("src", "../assets/images/x.svg");
    info_container.querySelector("p").innerHTML = "Incomplete data entered";
    event.preventDefault();
  }
});

//clear button
clear_btn.addEventListener("click", function(event) {
  document.getElementById("name-field").value = "";
  //setting the checked radio button to false
  document.querySelector('input[name="diet"]:checked').checked = false;
  class_dropdown_btn.innerHTML = "SELECT";
  status_dropdown_btn.innerHTML = "SELECT";
  data = google.visualization.arrayToDataTable(default_map_data);
  chart.draw(data, options); 
  document.getElementById("image-field").value = "";
  //antarctica set to false (as the default)
  ipc.send("antarctica_changed", false);
});

//update map by grabbing the map data again to update the map
ipc.on("update_map", function(event, arg) {
  data = google.visualization.arrayToDataTable(electron.remote.getGlobal("addPage_map_data"));
  chart.draw(data, options);
});