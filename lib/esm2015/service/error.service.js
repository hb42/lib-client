/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./electron.service";
/**
 * Fehler-Behandlung
 *
 * Fuer allgemeine Fehler muss die Anwendung eine Route fuer "/error" bereitstellen.
 *
 * Wenn die Anwendung neu geladen werden soll, ist Folgendes zu beachten:
 *
 * Im Browser wird der Reload mit document.location.reload() erledigt.
 *
 * In electron wuerde das nicht funktionieren (zumindest nicht mit Angular-SPA).
 * Da muss der Reload auf der electron-Seite erfolgen. Im electron start-script
 * sieht das in etwa so aus:
 * <pre>
 *   ipcMain.on("reload-app", function(event, arg) {
 *     console.log("APP RELOAD " + arg);
 *     mainWindow.loadURL(url.format({
 *                           pathname: path.join(__dirname, 'index.html'),
 *                           protocol: 'file:',
 *                           slashes: true
 *                        }));
 *   });
 * </pre>
 *
 */
// @dynamic
export class ErrorService {
    /**
     * @param {?} injector
     * @param {?} electronService
     */
    constructor(injector, electronService) {
        this.injector = injector;
        this.electronService = electronService;
        console.debug("c'tor ErrorService");
        this.errors = [];
    }
    /**
     * Fehlerseite anzeigen
     *
     * Die Anwendung muss eine Route fuer "/error" bereitstellen.
     *
     * param {string} short
     * param {string} desc
     * @param {?} short
     * @param {?} desc
     * @return {?}
     */
    newError(short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService.errorPage]);
    }
    /**
     * @return {?}
     */
    getLastError() {
        if (this.errors && this.errors.length > 0) {
            return this.errors.pop();
        }
        else {
            return {};
        }
    }
    /**
     * Anwendung neu laden
     *
     * Im Browser wird das mit document.location.reload() erledigt.
     *
     * In electron wuerde das nicht funktionieren (zumindest nicht mit Angular-SPA).
     * Da muss der Reload auf der electron-Seite erfolgen. Im electron start-script
     * sieht das in etwa so aus:
     * <pre>
     *   ipcMain.on("reload-app", function(event, arg) {
     *     console.log("APP RELOAD " + arg);
     *     mainWindow.loadURL(url.format({
     *                           pathname: path.join(__dirname, 'index.html'),
     *                           protocol: 'file:',
     *                           slashes: true
     *                        }));
     *   });
     * </pre>
     * @return {?}
     */
    resetApp() {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            (/** @type {?} */ (document.location)).reload(true);
        }
    }
    /**
     * Zentraler Exception-Handler
     *
     * in AppModule:
     *  providers: [{provide: ErrorHandler, useClass: ErrorService}]
     *
     * {\@link https://angular.io/api/core/ErrorHandler}
     *
     * param error
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    }
    /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    getRouter() {
        return this.injector.get(Router);
    }
}
ErrorService.errorPage = "error";
ErrorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ErrorService.ctorParameters = () => [
    { type: Injector },
    { type: ElectronService }
];
if (false) {
    /** @type {?} */
    ErrorService.errorPage;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.errors;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.electronService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2Vycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCckQsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBT3ZCLFlBQW9CLFFBQWtCLEVBQVUsZUFBZ0M7UUFBNUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM5RSxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7Ozs7Ozs7O0lBVU0sUUFBUSxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFTSxZQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDckU7YUFBTTtZQUNMLG1CQUFBLFFBQVEsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7O0lBWU0sV0FBVyxDQUFDLEtBQVU7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7Ozs7O0lBT08sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7QUF0RmEsc0JBQVMsR0FBVyxPQUFPLENBQUM7O1lBSDNDLFVBQVU7Ozs7WUE5QndCLFFBQVE7WUFHbEMsZUFBZTs7OztJQThCdEIsdUJBQTBDOzs7OztJQUUxQyw4QkFBdUI7Ozs7O0lBQ3ZCLDhCQUFtRTs7Ozs7SUFFdkQsZ0NBQTBCOzs7OztJQUFFLHVDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBFbGVjdHJvblNlcnZpY2UgfSBmcm9tIFwiLi9lbGVjdHJvbi5zZXJ2aWNlXCI7XG5cbi8qKlxuICogRmVobGVyLUJlaGFuZGx1bmdcbiAqXG4gKiBGdWVyIGFsbGdlbWVpbmUgRmVobGVyIG11c3MgZGllIEFud2VuZHVuZyBlaW5lIFJvdXRlIGZ1ZXIgXCIvZXJyb3JcIiBiZXJlaXRzdGVsbGVuLlxuICpcbiAqIFdlbm4gZGllIEFud2VuZHVuZyBuZXUgZ2VsYWRlbiB3ZXJkZW4gc29sbCwgaXN0IEZvbGdlbmRlcyB6dSBiZWFjaHRlbjpcbiAqXG4gKiBJbSBCcm93c2VyIHdpcmQgZGVyIFJlbG9hZCBtaXQgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkgZXJsZWRpZ3QuXG4gKlxuICogSW4gZWxlY3Ryb24gd3VlcmRlIGRhcyBuaWNodCBmdW5rdGlvbmllcmVuICh6dW1pbmRlc3QgbmljaHQgbWl0IEFuZ3VsYXItU1BBKS5cbiAqIERhIG11c3MgZGVyIFJlbG9hZCBhdWYgZGVyIGVsZWN0cm9uLVNlaXRlIGVyZm9sZ2VuLiBJbSBlbGVjdHJvbiBzdGFydC1zY3JpcHRcbiAqIHNpZWh0IGRhcyBpbiBldHdhIHNvIGF1czpcbiAqIDxwcmU+XG4gKiAgIGlwY01haW4ub24oXCJyZWxvYWQtYXBwXCIsIGZ1bmN0aW9uKGV2ZW50LCBhcmcpIHtcbiAqICAgICBjb25zb2xlLmxvZyhcIkFQUCBSRUxPQUQgXCIgKyBhcmcpO1xuICogICAgIG1haW5XaW5kb3cubG9hZFVSTCh1cmwuZm9ybWF0KHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IHBhdGguam9pbihfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiAnZmlsZTonLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBzbGFzaGVzOiB0cnVlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAqICAgfSk7XG4gKiA8L3ByZT5cbiAqXG4gKi9cbi8vIEBkeW5hbWljXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXJyb3JTZXJ2aWNlIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcblxuICBwdWJsaWMgc3RhdGljIGVycm9yUGFnZTogc3RyaW5nID0gXCJlcnJvclwiO1xuXG4gIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XG4gIHByaXZhdGUgcmVhZG9ubHkgZXJyb3JzOiBBcnJheTx7IHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyB9PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBlbGVjdHJvblNlcnZpY2U6IEVsZWN0cm9uU2VydmljZSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJjJ3RvciBFcnJvclNlcnZpY2VcIik7XG4gICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZWhsZXJzZWl0ZSBhbnplaWdlblxuICAgKlxuICAgKiBEaWUgQW53ZW5kdW5nIG11c3MgZWluZSBSb3V0ZSBmdWVyIFwiL2Vycm9yXCIgYmVyZWl0c3RlbGxlbi5cbiAgICpcbiAgICogcGFyYW0ge3N0cmluZ30gc2hvcnRcbiAgICogcGFyYW0ge3N0cmluZ30gZGVzY1xuICAgKi9cbiAgcHVibGljIG5ld0Vycm9yKHNob3J0OiBzdHJpbmcsIGRlc2M6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5yb3V0ZXIpIHtcbiAgICAgIHRoaXMucm91dGVyID0gdGhpcy5nZXRSb3V0ZXIoKTtcbiAgICB9XG4gICAgdGhpcy5lcnJvcnMucHVzaCh7dGl0bGU6IHNob3J0LCBtZXNzYWdlOiBkZXNjfSk7XG4gICAgY29uc29sZS5kZWJ1ZyhcIioqIG5ld0Vycm9yXCIpO1xuICAgIGNvbnNvbGUuZGVidWcoc2hvcnQgKyBcIiAtIFwiICsgZGVzYyk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL1wiICsgRXJyb3JTZXJ2aWNlLmVycm9yUGFnZV0pO1xuICB9XG5cbiAgcHVibGljIGdldExhc3RFcnJvcigpIHtcbiAgICBpZiAodGhpcy5lcnJvcnMgJiYgdGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFud2VuZHVuZyBuZXUgbGFkZW5cbiAgICpcbiAgICogSW0gQnJvd3NlciB3aXJkIGRhcyBtaXQgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkgZXJsZWRpZ3QuXG4gICAqXG4gICAqIEluIGVsZWN0cm9uIHd1ZXJkZSBkYXMgbmljaHQgZnVua3Rpb25pZXJlbiAoenVtaW5kZXN0IG5pY2h0IG1pdCBBbmd1bGFyLVNQQSkuXG4gICAqIERhIG11c3MgZGVyIFJlbG9hZCBhdWYgZGVyIGVsZWN0cm9uLVNlaXRlIGVyZm9sZ2VuLiBJbSBlbGVjdHJvbiBzdGFydC1zY3JpcHRcbiAgICogc2llaHQgZGFzIGluIGV0d2Egc28gYXVzOlxuICAgKiA8cHJlPlxuICAgKiAgIGlwY01haW4ub24oXCJyZWxvYWQtYXBwXCIsIGZ1bmN0aW9uKGV2ZW50LCBhcmcpIHtcbiAgICogICAgIGNvbnNvbGUubG9nKFwiQVBQIFJFTE9BRCBcIiArIGFyZyk7XG4gICAqICAgICBtYWluV2luZG93LmxvYWRVUkwodXJsLmZvcm1hdCh7XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IHBhdGguam9pbihfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6ICdmaWxlOicsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xhc2hlczogdHJ1ZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICogICB9KTtcbiAgICogPC9wcmU+XG4gICAqL1xuICBwdWJsaWMgcmVzZXRBcHAoKSB7XG4gICAgaWYgKHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmlzRWxlY3Ryb24pIHtcbiAgICAgIHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmlwY1JlbmRlcmVyLnNlbmQoXCJyZWxvYWQtYXBwXCIsIFwiZXJyb3JTZXJ2aWNlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbiEucmVsb2FkKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBaZW50cmFsZXIgRXhjZXB0aW9uLUhhbmRsZXJcbiAgICpcbiAgICogaW4gQXBwTW9kdWxlOlxuICAgKiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlQ2xhc3M6IEVycm9yU2VydmljZX1dXG4gICAqXG4gICAqIHtAbGluayBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvRXJyb3JIYW5kbGVyfVxuICAgKlxuICAgKiBwYXJhbSBlcnJvclxuICAgKi9cbiAgcHVibGljIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiKiogaGFuZGxlRXJyb3JcIik7XG4gICAgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgIHRoaXMubmV3RXJyb3IoXCJBbndlbmR1bmdzZmVobGVyXCIsIGVycm9yKTtcbiAgfVxuXG4gIC8qXG4gICAgUm91dGVyIGthbm4gbmljaHQgcGVyIERJIGdlaG9sdCB3ZXJkZW4sIGRhIGRhcyBlaW5lIHp5a2xpc2NoZSBBYmhhZW5naWdrZWl0IGF1c2xvZXN0IChIdHRwIC0+IFJvdXRlci0+IEh0dHApXG4gICAgV2VubiBSb3V0ZXIgc3BhZXRlciBnZWhvbHQgd2lyZCwgZ2lidCBlcyBrZWluZSBQcm9ibGVtZS4gRW50c3ByaWNodCBuaWNodCBkZXIgcmVpbmVuIExlaHJlIC0+IHdlbm4gbWFsIFplaXQgaXN0XG4gICAgLT4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk3NjcwMTlcbiAgICovXG4gIHByaXZhdGUgZ2V0Um91dGVyKCk6IFJvdXRlciB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG4gIH1cbn1cbiJdfQ==