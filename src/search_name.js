const electron =  require("electron");
const ipc = electron.ipcRenderer;
const search_btn = document.getElementById("button");
const input_field = document.getElementById("input-field");

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});

search_btn.addEventListener("click", function(event) {
  //recieve the animal names based on search entered
  fetch("http://127.0.0.1:5000/searchBy_name", {
    method: "POST",
    body: JSON.stringify(input_field.value),
    cache: "no-cache",
    headers: {
      "content-type": "application/json"
    }
  })
  .then(response => response.json())
  .then((data) => {
    //sending the search results to update the results
    ipc.send("send_search_results", data);
    event.preventDefault();
    window.location.href = "search_display.html"; //change window location
  })
  .catch(error => console.error(error));
});