const remove_btn = document.getElementById("remove-button");
const input_field = document.getElementById("input-field");
const info_container = document.getElementById("info-bar");

document.querySelector("ul").addEventListener("click", function(event) { //sidebar functionality
  if (event.srcElement.tagName == "LI") {
    window.location.href = event.srcElement.children[0].href;
  }
});

remove_btn.addEventListener("click", function (event) { //remove clicked
  //sends animal name to remove animal entry from the database
  fetch("http://127.0.0.1:5000/remove_animal", {
    method: "POST",
    body: JSON.stringify(input_field.value),
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
    info_container.querySelector("p").innerHTML = "Animal has been removed from the database";
    event.preventDefault();
    }
    else { //displays the "incorrect" message
      info_container.classList.remove("no-display");
      info_container.querySelector("img").setAttribute("src", "../assets/images/x.svg");
      info_container.querySelector("p").innerHTML = "Animal doesn’t exists in the database";
      event.preventDefault();
    }
  })
  .catch(error => console.error(error));
});