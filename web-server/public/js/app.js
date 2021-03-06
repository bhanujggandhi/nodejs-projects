const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#location");
const messageTwo = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (messageOne.textContent = data.error);
        }

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      });
    }
  );
});
