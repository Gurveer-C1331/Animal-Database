const electron =  require("electron");
const ipc = electron.ipcRenderer;
const dropdown_btn = document.getElementById("dropdown-button");
const dropdown_content = document.getElementById("dropdown-content");
const search_btn = document.getElementById("search-button");

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});

dropdown_btn.addEventListener("click", function (event) { //toggles the dropdown function
  dropdown_btn.classList.toggle("open");
  dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

dropdown_content.addEventListener("click", function (event) { //continent clicked
  var continent_clicked = event.srcElement.innerHTML;
  dropdown_btn.innerHTML = continent_clicked;
  dropdown_btn.classList.toggle("open");
  dropdown_content.classList.toggle("no-display");
  event.preventDefault();
});

search_btn.addEventListener("click", function (event) { //search clicked
  //recieve the animal names based on continent entered to search
  fetch("http://127.0.0.1:5000/searchBy_continent", {
    method: "POST",
    body: JSON.stringify(dropdown_btn.innerHTML),
    cache: "no-cache",
    headers: {
      "content-type": "application/json"
    }
  })
  .then(response => response.json())
  .then((data) => {
    //sending the search results
    ipc.send("send_search_results", data);
    event.preventDefault();
    window.location.href = "search_display.html";
  })
  .catch(error => console.error(error));
});