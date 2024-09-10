export function MicroFrontend(
  name: string,
  host: string,
  history?: History,
  onUnmount?: (data: any) => void
) {
  const scriptId = `micro-frontend-script-${name}`;

  const renderMicroFrontend = function () {
    if (window[`render${name}`]) {
      window[`render${name}`](`${name}-container`, history);
    }
  };

  const cleanupMicroFrontend = function () {
    if (window[`unmount${name}`]) {
      window[`unmount${name}`](`${name}-container`, onUnmount);
    }

    // Remove the script tag to ensure fresh load when re-opening
    const script = document.getElementById(scriptId);
    if (script) {
      script.remove();
    }
  };

  // Check if script already exists
  if (document.getElementById(scriptId)) {
    renderMicroFrontend();
  } else {
    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = function () {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      })
      .catch((error) => {
        console.error("Error loading micro frontend script:", error);
      });
  }

  // Return both render and cleanup functions to toggle the app
  return { renderMicroFrontend, cleanupMicroFrontend };
}
