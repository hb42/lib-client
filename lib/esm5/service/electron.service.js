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
        /** @type {?} */
        var win = window;
        if (typeof win.require === "function") {
            /** @type {?} */
            var electron = win.require("electron");
            if (electron) {
                this.ipcrenderer = electron.ipcRenderer;
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2VsZWN0cm9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQnZCO0lBbUJFOzs7Ozs7OztZQU9RLEdBQUcsR0FBUSxNQUFNO1FBQ3ZCLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTs7Z0JBQy9CLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN4QyxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7YUFDekM7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRSx5R0FBeUc7U0FDMUc7SUFDSCxDQUFDO0lBaENELHNCQUFJLHdDQUFXOzs7O1FBQWY7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx1Q0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksNENBQWU7Ozs7UUFBbkI7WUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDOzs7T0FBQTs7Z0JBakJGLFVBQVU7Ozs7SUF1Q1gsc0JBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQXRDWSxlQUFlOzs7Ozs7SUFFMUIsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqXG4gKiBWZXJiaW5kdW5nIHp1ciBlbGVjdHJvbiBydW50aW1lXG4gKlxuICogIFZlcndlbmR1bmc6XG4gKiAgPHByZT5cbiAqICAgcHVibGljIHRlc3RFbGVjdHJvbihlbGVjdHJvblNlcnZpY2UuaXBjUmVuZGVyZXIpIHtcbiAqICAgICBjb25zb2xlLmluZm8oXCIjIyMgc3luYyByZXBseSBcIiArIGlwY1JlbmRlcmVyLnNlbmRTeW5jKFwic3luY2hyb25vdXMtbWVzc2FnZVwiLCBcInBpbmdcIikpO1xuICpcbiAqICAgICBpcGNSZW5kZXJlci5vbihcImFzeW5jaHJvbm91cy1yZXBseVwiLCAoZXZlbnQsIGFyZykgPT4ge1xuICogICAgICAgY29uc29sZS5pbmZvKFwiIyMjIGFzeW5jIHJlcGx5IFwiICsgYXJnKTtcbiAqICAgICB9KTtcbiAqICAgICBpcGNSZW5kZXJlci5zZW5kKFwiYXN5bmNocm9ub3VzLW1lc3NhZ2VcIiwgXCJwaW5nXCIpO1xuICogICB9XG4gKiA8L3ByZT5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVsZWN0cm9uU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBpcGNyZW5kZXJlcjogYW55O1xuXG4gIGdldCBpcGNSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pcGNyZW5kZXJlcjtcbiAgfVxuICBnZXQgaXNFbGVjdHJvbigpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMuaXBjcmVuZGVyZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgZ2V0IGVsZWN0cm9uVmVyc2lvbigpIHtcbiAgICBpZiAodGhpcy5pc0VsZWN0cm9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5pcGNSZW5kZXJlci5zZW5kU3luYyhcImdldC12ZXJzaW9uXCIsIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvKlxuICAgICBlbGVjdHJvbiBtaXQgd2luZG93LnJlcXVpcmUgaG9sZW4sIGRhcyB3aXJkIG5pY2h0IHZvbiB3ZWJwYWNrIHVlYmVyc2NocmllYmVuLiBEYWR1cmNoXG4gICAgIGlnbm9yaWVydCB3ZWJwYWNrIGVsZWN0cm9uIHVuZCBwYWNrdCBlcyBuaWNodCBpbiB2ZW5kb3IuanMuIEF1c3NlcmRlbSB3aXJkIHNvIGRpZSB2b3JoYW5kZW5lXG4gICAgIGVsZWN0cm9uLVJ1bnRpbWUgdmVyd2VuZGV0LiB3aW5kb3cucmVxdWlyZSBpc3QgbnVyIGluIGVpbmVyIG5vZGUvZWxlY3Ryb24tVW1nZWJ1bmcgdm9yaGFuZGVuLlxuICAgICAtPiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2lzc3Vlcy83MzAwfVxuICAgICAqL1xuICAgIGNvbnN0IHdpbjogYW55ID0gd2luZG93O1xuICAgIGlmICh0eXBlb2Ygd2luLnJlcXVpcmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3QgZWxlY3Ryb24gPSB3aW4ucmVxdWlyZShcImVsZWN0cm9uXCIpO1xuICAgICAgaWYgKGVsZWN0cm9uKSB7XG4gICAgICAgIHRoaXMuaXBjcmVuZGVyZXIgPSBlbGVjdHJvbi5pcGNSZW5kZXJlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFbGVjdHJvbikge1xuICAgICAgY29uc29sZS5pbmZvKFwiUnVubmluZyBvbiBlbGVjdHJvbiBydW50aW1lIFwiICsgdGhpcy5lbGVjdHJvblZlcnNpb24pO1xuICAgICAgLy8gY29uc29sZS5kaXIocHJvY2Vzcy52ZXJzaW9ucyk7IC8vIEFuZ3VsYXIgY2xpIGFiIHY2IHVudGVyc3R1ZXR6dCBrZWluZSBsaWJzIG1pdCBBYmhhZW5naWtlaXRlbiB6dSBub2RlXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==