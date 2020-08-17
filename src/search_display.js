const electron = require("electron");
const ipc = electron.ipcRenderer;
const list = document.getElementById("list-container");
const learn_btn = document.getElementById("learn-button")
var animal_selected = null;

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});

list.addEventListener("click", function(event) {
  animal_selected = event.srcElement.innerHTML; //retrieves animal that is clicked
  for (i = 0; i < list.children.length; i++) {
    list.children[i].style.backgroundColor = "#F2F2F2"; //resets all the animal links background colour
  }
  event.srcElement.style.backgroundColor = "#FAFAFA"; //sets background colour for animal link clicked
  event.preventDefault();
});

//recieve search results
const data = electron.remote.getGlobal("search_results");
  //creating and adding animal links (a) to the list container
for (i = 0; i < data.length; i++) {
  var link = document.createElement("a");
  link.href = "#";
  link.innerHTML = data[i];
  list.appendChild(link);
}

//learn button
learn_btn.addEventListener("click", function(event) {
  //if animal is not selected, first animal in the list is the default
  if (animal_selected == null) animal_selected = list.children[0].innerHTML;
  //sending animal selected to update the selection
  ipc.send("animal_selected", animal_selected);
  event.preventDefault();
  window.location.href = "animal_display.html"; //change window location
});