import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-DGKNJD5N.js";
import {
  componentOnReady
} from "./chunk-BAXNF7WZ.js";
import {
  readTask,
  writeTask
} from "./chunk-TBCILI2J.js";
import {
  __async
} from "./chunk-Q3N56TRI.js";

// node_modules/@ionic/core/dist/esm/status-tap-BfJqFSLF.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(null, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
/*! Bundled license information:

@ionic/core/dist/esm/status-tap-BfJqFSLF.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=status-tap-BfJqFSLF-3FAHPJHK.js.map
