(()=>{"use strict";var n=!1,e=null,t=document.createElement("button");t.innerText="Load Weather App",t.id="loadReactAppButton";var o=null;t.addEventListener("click",(function(){if(n){alert("Closing Weather App"),e.cleanupMicroFrontend(),n=!1,t.innerText="Load Weather App";var c=document.getElementById("landing-container-id");c&&(c.innerText="Jump to Landing App. Lat: ".concat(o.latitude,", Lon: ").concat(o.longitude))}else alert("Opening Weather App"),e=function(n,e,t,o){var c="micro-frontend-script-".concat(n),a=document.getElementById("".concat(n,"-container"));a||((a=document.createElement("main")).id="".concat(n,"-container"),document.body.appendChild(a));var r=function(){window["render".concat(n)]&&window["render".concat(n)]("".concat(n,"-container"),undefined)};return document.getElementById(c)?r():fetch("".concat(e,"/asset-manifest.json")).then((function(n){return n.json()})).then((function(n){var t=document.createElement("script");t.id=c,t.crossOrigin="",t.src="".concat(e).concat(n.files["main.js"]),t.onload=function(){r()},document.head.appendChild(t)})).catch((function(n){console.error("Error loading micro frontend script:",n)})),{renderMicroFrontend:r,cleanupMicroFrontend:function(){window["unmount".concat(n)]&&window["unmount".concat(n)]("".concat(n,"-container"),o)}}}("weatherapp","http://localhost:3000",0,(function(n){o=n})),n=!0,t.innerText="Close Weather App"})),document.body.appendChild(t);var c=document.createElement("div");c.id="landing-container-id",document.body.appendChild(c)})();