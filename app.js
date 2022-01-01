const input = document.querySelector(".input");
const inputBtn = document.querySelector(".input__btn");

const address = document.getElementById("address");
const locationText = document.getElementById("locationText");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const loader__container = document.querySelector(".loader__container");
const container = document.querySelector(".container");
let map;

function initMap(latIp, lngIp) {
  const myLatLng = { lat: parseFloat(latIp), lng: parseFloat(lngIp) };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 15,
  });

  // var marker = new google.maps.Marker({
  //   position: { myLatLng },
  //   map,
  //   title: "Hello World!",
  // });
  // marker.setMap(map);
  var infowindow = new google.maps.InfoWindow();

  marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: "./images/marker.svg",
  });
  google.maps.event.addListener(
    marker,
    "click",
    (function (marker) {
      return function () {
        infowindow.setContent("Тут могла бы быть ваша реклама ))) ");
        infowindow.open(map, marker);
      };
    })(marker)
  );
}

inputBtn.addEventListener("click", () => {
  // console.log(checkIP2(input.value));
  if (checkIP2(input.value)) {
    console.log(input.value);
    fetch(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=4f98adb65975476ba38b88d71cb4e02b&ip_address=${input.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        address.textContent = data.ip_address;
        locationText.textContent = data.city;
        timezone.textContent = "UTC + " + data.timezone.abbreviation;
        isp.textContent = data.connection.autonomous_system_organization;
        initMap(parseFloat(data.latitude), parseFloat(data.longitude));
      });
  } else {
    alert("Неправильно введен IP");
  }
});

function checkIP2(str) {
  const template =
    /^(0|[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0|[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0|[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.(0|[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;
  return template.test(str);
}

function startApp() {
  async function Fetch() {
    const response = await fetch(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=4f98adb65975476ba38b88d71cb4e02b"
    );
    const data = await response.json();
    loader__container.classList.add("close");
    container.classList.add("open");
    console.log(data);
    address.textContent = data.ip_address;
    locationText.textContent = data.city;
    timezone.textContent = data.timezone.abbreviation;
    isp.textContent = data.connection.autonomous_system_organization;
    console.log(data.latitude);
    initMap(parseFloat(data.latitude), parseFloat(data.longitude));
  }
  Fetch();
}

function openModal() {
  
}
startApp();
