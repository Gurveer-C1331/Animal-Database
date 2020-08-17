document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});