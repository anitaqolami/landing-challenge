import "./index";

let button: HTMLElement;
let stateContainer: HTMLElement;

describe("MicroFrontend integration", () => {
  beforeEach(() => {
    // Set up DOM elements
    document.body.innerHTML = "";
    button = document.createElement("button");
    button.innerText = "Close React App";
    button.id = "loadReactAppButton";

    stateContainer = document.createElement("div");
    stateContainer.id = "landing-container-id";

    document.body.appendChild(button);
    document.body.appendChild(stateContainer);

    // Import index.ts to initialize its logic
    require("./index");
  });

  test("should click in button", async () => {
    // Simulate a click to load React app
    button.click();

    // Check if the button's text has changed to "Close React App"
    expect(button.innerText).toBe("Close React App");
  });
});
