console.log("clientside js up and running");

// as this is client side and not running on code we can use fetch/ use async await

const getWeather = (address) => {
  fetch("/weather?address=" + address).then((data) => {
    data.json().then((obj) => {
      console.log(obj);
      const loc = document.getElementById("loc");
      const fore = document.getElementById("forecast");
      fore.textContent = obj.forecast;
      loc.textContent = obj.address;
    });
  });
};
// dom manipulation

const search = document.querySelector("form ");

search.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = search.firstElementChild.value;
  getWeather(address);
  search.reset();
});
