const list = document.getElementById("list-container");

//retrieving database list of names
fetch("http://127.0.0.1:5000/listofNames", {
  method: "GET"
})
.then(response => response.json())
.then((data) => {
  //creating and adding animal links (a) to the list container
  for (i = 0; i < data.length; i++) {
    var link = document.createElement("a");
    link.href = "#";
    link.innerHTML = data[i];
    list.appendChild(link);
  } 
})
.catch(error => console.error(error));

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});
