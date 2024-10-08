import { MicroFrontend } from "./MicroFrontend";

const weatherHost = process.env.WEATHER_APP_WEATHER_HOST;

let isMounted = false;
let microFrontendInstance: any = null; // To store the MicroFrontend instance

const button = document.createElement("button");
button.innerText = "Load The Weather App";
button.id = "loadReactAppButton";

// Add Tailwind styles to the button
button.classList.add(
  "border",
  "font-bold",
  "py-2",
  "px-4",
  "rounded",
  "hover:bg-blue-500",
  "hover:text-white",
  "transition",
  "duration-300",
  "shadow"
);

let dataRemote: {
  latitude: number;
  longitude: number;
  weatherData: { [key: string]: any };
} = null;

button.addEventListener("click", () => {
  if (!isMounted) {
    alert("Opening Weather App");
    microFrontendInstance = MicroFrontend(
      "weatherapp",
      weatherHost,
      undefined,
      (data) => {
        dataRemote = data;
      }
    );
    isMounted = true;
    button.innerText = "Close The Weather App";
    stateContainer.innerText = ``;
  } else {
    alert("Closing The Weather App");
    microFrontendInstance.cleanupMicroFrontend();
    isMounted = false;
    button.innerText = "Load The Weather App";
    const stateContainer = document.getElementById("landing-container-id");
    if (stateContainer) {
      stateContainer.innerHTML = `
        <div class="pb-5">Jump to Landing App</div>
        <div>Lat: <strong>${dataRemote.latitude}</strong></div>
        <div>Lon: <strong>${dataRemote.longitude}</strong></div>
        <div>City: <strong>${dataRemote?.weatherData?.name}</strong></div>
        <div>Statue Weather: <strong>${dataRemote?.weatherData?.weather[0]?.main}</strong></div>
        <div>Temperature: <strong>${dataRemote?.weatherData?.main?.temp}</strong></div>
        <div>Maximum Temperature: <strong>${dataRemote?.weatherData?.main?.temp_max}</strong></div>
        <div>Minimum Temperature: <strong>${dataRemote?.weatherData?.main?.temp_min}</strong></div>
      `;
    }
  }
});

document.body.appendChild(button);

// Container to display the received state
const stateContainer = document.createElement("div");
stateContainer.id = "landing-container-id";
document.body.appendChild(stateContainer);
