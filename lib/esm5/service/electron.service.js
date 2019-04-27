/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, } from "@angular/core";
/**
 * Verbindung zur electron runtime
 *
 *  Verwendung:
 *  <pre>
 *   public testElectron(electronService.ipcRenderer) {
 *     console.info("### sync reply " + ipcRenderer.sendSync("synchronous-message", "ping"));
 *
 *     ipcRenderer.on("asynchronous-reply", (event, arg) => {
 *       console.info("### async reply " + arg);
 *     });
 *     ipcRenderer.send("asynchronous-message", "ping");
 *   }
 * </pre>
 */
var ElectronService = /** @class */ (function () {
    function ElectronService() {
        /*
         electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
         ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
         electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
         -> {@link https://github.com/electron/electron/issues/7300}
         */
        // const win: any = window;
        // if (typeof win.require === "function") {
        //   const electron = win.require("electron");
        //   if (electron) {
        //     this.ipcrenderer = electron.ipcRenderer;
        //   }
        // }
        if (this.isElectron) {
            console.info("Running on electron runtime " + this.electronVersion);
            // console.dir(process.versions); // Angular cli ab v6 unterstuetzt keine libs mit Abhaengikeiten zu node
        }
    }
    Object.defineProperty(ElectronService.prototype, "ipcRenderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ipcrenderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isElectron", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this.ipcrenderer !== "undefined";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "electronVersion", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isElectron) {
                return this.ipcRenderer.sendSync("get-version", "");
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ElectronService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ElectronService.ctorParameters = function () { return []; };
    return ElectronService;
}());
export { ElectronService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype.ipcrenderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2VsZWN0cm9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQnZCO0lBbUJFO1FBQ0U7Ozs7O1dBS0c7UUFDSCwyQkFBMkI7UUFDM0IsMkNBQTJDO1FBQzNDLDhDQUE4QztRQUM5QyxvQkFBb0I7UUFDcEIsK0NBQStDO1FBQy9DLE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3BFLHlHQUF5RztTQUMxRztJQUNILENBQUM7SUFoQ0Qsc0JBQUksd0NBQVc7Ozs7UUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHVDQUFVOzs7O1FBQWQ7WUFDRSxPQUFPLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSw0Q0FBZTs7OztRQUFuQjtZQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUM7OztPQUFBOztnQkFqQkYsVUFBVTs7OztJQXVDWCxzQkFBQztDQUFBLEFBdkNELElBdUNDO1NBdENZLGVBQWU7Ozs7OztJQUUxQixzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIFZlcmJpbmR1bmcgenVyIGVsZWN0cm9uIHJ1bnRpbWVcbiAqXG4gKiAgVmVyd2VuZHVuZzpcbiAqICA8cHJlPlxuICogICBwdWJsaWMgdGVzdEVsZWN0cm9uKGVsZWN0cm9uU2VydmljZS5pcGNSZW5kZXJlcikge1xuICogICAgIGNvbnNvbGUuaW5mbyhcIiMjIyBzeW5jIHJlcGx5IFwiICsgaXBjUmVuZGVyZXIuc2VuZFN5bmMoXCJzeW5jaHJvbm91cy1tZXNzYWdlXCIsIFwicGluZ1wiKSk7XG4gKlxuICogICAgIGlwY1JlbmRlcmVyLm9uKFwiYXN5bmNocm9ub3VzLXJlcGx5XCIsIChldmVudCwgYXJnKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmluZm8oXCIjIyMgYXN5bmMgcmVwbHkgXCIgKyBhcmcpO1xuICogICAgIH0pO1xuICogICAgIGlwY1JlbmRlcmVyLnNlbmQoXCJhc3luY2hyb25vdXMtbWVzc2FnZVwiLCBcInBpbmdcIik7XG4gKiAgIH1cbiAqIDwvcHJlPlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWxlY3Ryb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IGlwY3JlbmRlcmVyOiBhbnk7XG5cbiAgZ2V0IGlwY1JlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmlwY3JlbmRlcmVyO1xuICB9XG4gIGdldCBpc0VsZWN0cm9uKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5pcGNyZW5kZXJlciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBnZXQgZWxlY3Ryb25WZXJzaW9uKCkge1xuICAgIGlmICh0aGlzLmlzRWxlY3Ryb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlwY1JlbmRlcmVyLnNlbmRTeW5jKFwiZ2V0LXZlcnNpb25cIiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qXG4gICAgIGVsZWN0cm9uIG1pdCB3aW5kb3cucmVxdWlyZSBob2xlbiwgZGFzIHdpcmQgbmljaHQgdm9uIHdlYnBhY2sgdWViZXJzY2hyaWViZW4uIERhZHVyY2hcbiAgICAgaWdub3JpZXJ0IHdlYnBhY2sgZWxlY3Ryb24gdW5kIHBhY2t0IGVzIG5pY2h0IGluIHZlbmRvci5qcy4gQXVzc2VyZGVtIHdpcmQgc28gZGllIHZvcmhhbmRlbmVcbiAgICAgZWxlY3Ryb24tUnVudGltZSB2ZXJ3ZW5kZXQuIHdpbmRvdy5yZXF1aXJlIGlzdCBudXIgaW4gZWluZXIgbm9kZS9lbGVjdHJvbi1VbWdlYnVuZyB2b3JoYW5kZW4uXG4gICAgIC0+IHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24vaXNzdWVzLzczMDB9XG4gICAgICovXG4gICAgLy8gY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XG4gICAgLy8gaWYgKHR5cGVvZiB3aW4ucmVxdWlyZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gICBjb25zdCBlbGVjdHJvbiA9IHdpbi5yZXF1aXJlKFwiZWxlY3Ryb25cIik7XG4gICAgLy8gICBpZiAoZWxlY3Ryb24pIHtcbiAgICAvLyAgICAgdGhpcy5pcGNyZW5kZXJlciA9IGVsZWN0cm9uLmlwY1JlbmRlcmVyO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICBpZiAodGhpcy5pc0VsZWN0cm9uKSB7XG4gICAgICBjb25zb2xlLmluZm8oXCJSdW5uaW5nIG9uIGVsZWN0cm9uIHJ1bnRpbWUgXCIgKyB0aGlzLmVsZWN0cm9uVmVyc2lvbik7XG4gICAgICAvLyBjb25zb2xlLmRpcihwcm9jZXNzLnZlcnNpb25zKTsgLy8gQW5ndWxhciBjbGkgYWIgdjYgdW50ZXJzdHVldHp0IGtlaW5lIGxpYnMgbWl0IEFiaGFlbmdpa2VpdGVuIHp1IG5vZGVcbiAgICB9XG4gIH1cblxufVxuIl19