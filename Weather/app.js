const apiKey = "ca524ee843084dc2be7143914262701";

async function getWeather() {
  const cityInput = document.getElementById("locationInput");
  const city = cityInput.value || "Delhi";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("temp").innerText =
      data.current.temp_c + "°C";

    document.getElementById("city").innerText =
      data.location.name;

    document.getElementById("condition").innerText =
      data.current.condition.text;

    document.getElementById("time").innerText =
      data.location.localtime;

    changeBackground(data.current.condition.text);

    cityInput.value = "";

  } catch (error) {
    alert("City not found ❌");
  }
}

function changeBackground(condition) {
  if (condition.includes("Rain")) {
    document.body.style.background = "#6c7a89";
  } else if (condition.includes("Clear")) {
    document.body.style.background = "#87ceeb";
  } else if (condition.includes("Cloud")) {
    document.body.style.background = "#b0c4de";
  } else {
    document.body.style.background = "#8fd3f4";
  }

}
async function searchCity(query) {
  const suggestionBox = document.getElementById("suggestions");

  if (query.length < 2) {
    suggestionBox.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`
    );

    const cities = await res.json();
    suggestionBox.innerHTML = "";

    cities.forEach(city => {
      const li = document.createElement("li");
      li.innerText = `${city.name}, ${city.country}`;

      li.onclick = () => {
        document.getElementById("locationInput").value = city.name;
        suggestionBox.innerHTML = "";
        getWeather(); // 🔥 auto fetch weather
      };

      suggestionBox.appendChild(li);
    });

  } catch (err) {
    console.error("Autocomplete error", err);
  }
}

