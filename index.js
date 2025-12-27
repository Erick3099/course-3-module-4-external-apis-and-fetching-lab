// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");


async function fetchWeatherAlerts(state) {
  const url = `https://api.weather.gov/alerts/active?area=${state}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to retrieve weather alerts.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
function displayAlerts(data, state) {
  alertsDisplay.innerHTML = "";

  const alertCount = data.features.length;

  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${alertCount}`;
  alertsDisplay.appendChild(title);

  const list = document.createElement("ul");

  data.features.forEach(alert => {
    const listItem = document.createElement("li");
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
  });

  alertsDisplay.appendChild(list);
}
function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();
  alertsDisplay.innerHTML = "";
  clearError();
  if (!state) {
    showError("State abbreviation is required");
    return;
  }

  try {
    const data = await fetchWeatherAlerts(state);
    displayAlerts(data, state);
    input.value = "";
  } catch (error) {
    showError(error.message);
  }
});
