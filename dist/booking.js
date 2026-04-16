"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/booking.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(() => {
  });
})();
//# sourceMappingURL=booking.js.map
