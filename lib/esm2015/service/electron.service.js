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
export class ElectronService {
    constructor() {
        /*
             electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
             ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
             electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
             -> {@link https://github.com/electron/electron/issues/7300}
             */
        /** @type {?} */
        const win = window;
        if (typeof win.require === "function") {
            /** @type {?} */
            const electron = win.require("electron");
            if (electron) {
                this.ipcrenderer = electron.ipcRenderer;
            }
        }
        if (this.isElectron) {
            console.info("Running on electron runtime:");
            console.dir(process.versions);
        }
    }
    /**
     * @return {?}
     */
    get ipcRenderer() {
        return this.ipcrenderer;
    }
    /**
     * @return {?}
     */
    get isElectron() {
        return typeof this.ipcrenderer !== "undefined";
    }
    /**
     * @return {?}
     */
    get electronVersion() {
        if (this.isElectron) {
            return this.ipcRenderer.sendSync("get-version", "");
        }
        else {
            return null;
        }
    }
}
ElectronService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ElectronService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype.ipcrenderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2VsZWN0cm9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnZCLE1BQU0sT0FBTyxlQUFlO0lBa0IxQjs7Ozs7Ozs7Y0FPUSxHQUFHLEdBQVEsTUFBTTtRQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7O2tCQUMvQixRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDeEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO2FBQ3pDO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7OztJQWhDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQztJQUNqRCxDQUFDOzs7O0lBQ0QsSUFBSSxlQUFlO1FBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7OztZQWpCRixVQUFVOzs7Ozs7Ozs7SUFHVCxzQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RhYmxlLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIFZlcmJpbmR1bmcgenVyIGVsZWN0cm9uIHJ1bnRpbWVcbiAqXG4gKiAgVmVyd2VuZHVuZzpcbiAqICA8cHJlPlxuICogICBwdWJsaWMgdGVzdEVsZWN0cm9uKGVsZWN0cm9uU2VydmljZS5pcGNSZW5kZXJlcikge1xuICogICAgIGNvbnNvbGUuaW5mbyhcIiMjIyBzeW5jIHJlcGx5IFwiICsgaXBjUmVuZGVyZXIuc2VuZFN5bmMoXCJzeW5jaHJvbm91cy1tZXNzYWdlXCIsIFwicGluZ1wiKSk7XG4gKlxuICogICAgIGlwY1JlbmRlcmVyLm9uKFwiYXN5bmNocm9ub3VzLXJlcGx5XCIsIChldmVudCwgYXJnKSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmluZm8oXCIjIyMgYXN5bmMgcmVwbHkgXCIgKyBhcmcpO1xuICogICAgIH0pO1xuICogICAgIGlwY1JlbmRlcmVyLnNlbmQoXCJhc3luY2hyb25vdXMtbWVzc2FnZVwiLCBcInBpbmdcIik7XG4gKiAgIH1cbiAqIDwvcHJlPlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWxlY3Ryb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IGlwY3JlbmRlcmVyOiBhbnk7XG5cbiAgZ2V0IGlwY1JlbmRlcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmlwY3JlbmRlcmVyO1xuICB9XG4gIGdldCBpc0VsZWN0cm9uKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5pcGNyZW5kZXJlciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBnZXQgZWxlY3Ryb25WZXJzaW9uKCkge1xuICAgIGlmICh0aGlzLmlzRWxlY3Ryb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmlwY1JlbmRlcmVyLnNlbmRTeW5jKFwiZ2V0LXZlcnNpb25cIiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qXG4gICAgIGVsZWN0cm9uIG1pdCB3aW5kb3cucmVxdWlyZSBob2xlbiwgZGFzIHdpcmQgbmljaHQgdm9uIHdlYnBhY2sgdWViZXJzY2hyaWViZW4uIERhZHVyY2hcbiAgICAgaWdub3JpZXJ0IHdlYnBhY2sgZWxlY3Ryb24gdW5kIHBhY2t0IGVzIG5pY2h0IGluIHZlbmRvci5qcy4gQXVzc2VyZGVtIHdpcmQgc28gZGllIHZvcmhhbmRlbmVcbiAgICAgZWxlY3Ryb24tUnVudGltZSB2ZXJ3ZW5kZXQuIHdpbmRvdy5yZXF1aXJlIGlzdCBudXIgaW4gZWluZXIgbm9kZS9lbGVjdHJvbi1VbWdlYnVuZyB2b3JoYW5kZW4uXG4gICAgIC0+IHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24vaXNzdWVzLzczMDB9XG4gICAgICovXG4gICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XG4gICAgaWYgKHR5cGVvZiB3aW4ucmVxdWlyZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBlbGVjdHJvbiA9IHdpbi5yZXF1aXJlKFwiZWxlY3Ryb25cIik7XG4gICAgICBpZiAoZWxlY3Ryb24pIHtcbiAgICAgICAgdGhpcy5pcGNyZW5kZXJlciA9IGVsZWN0cm9uLmlwY1JlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5pc0VsZWN0cm9uKSB7XG4gICAgICBjb25zb2xlLmluZm8oXCJSdW5uaW5nIG9uIGVsZWN0cm9uIHJ1bnRpbWU6XCIpO1xuICAgICAgY29uc29sZS5kaXIocHJvY2Vzcy52ZXJzaW9ucyk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==