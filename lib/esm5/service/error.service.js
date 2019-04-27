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
var ErrorService = /** @class */ (function () {
    function ErrorService(injector, electronService) {
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
     */
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
    ErrorService.prototype.newError = /**
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
    function (short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService.errorPage]);
    };
    /**
     * @return {?}
     */
    ErrorService.prototype.getLastError = /**
     * @return {?}
     */
    function () {
        if (this.errors && this.errors.length > 0) {
            return this.errors.pop();
        }
        else {
            return {};
        }
    };
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
     */
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
    ErrorService.prototype.resetApp = /**
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
    function () {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            (/** @type {?} */ (document.location)).reload(true);
        }
    };
    /**
     * Zentraler Exception-Handler
     *
     * in AppModule:
     *  providers: [{provide: ErrorHandler, useClass: ErrorService}]
     *
     * {@link https://angular.io/api/core/ErrorHandler}
     *
     * param error
     */
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
    ErrorService.prototype.handleError = /**
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
    function (error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    };
    /*
      Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
      Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    ErrorService.prototype.getRouter = /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    function () {
        return this.injector.get(Router);
    };
    ErrorService.errorPage = "error";
    ErrorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ErrorService.ctorParameters = function () { return [
        { type: Injector },
        { type: ElectronService }
    ]; };
    return ErrorService;
}());
export { ErrorService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2Vycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCckQ7SUFRRSxzQkFBb0IsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzlFLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7Ozs7O0lBQ0ksK0JBQVE7Ozs7Ozs7Ozs7O0lBQWYsVUFBZ0IsS0FBYSxFQUFFLElBQVk7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVNLG1DQUFZOzs7SUFBbkI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDSSwrQkFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBZjtRQUNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNyRTthQUFNO1lBQ0wsbUJBQUEsUUFBUSxDQUFDLFFBQVEsRUFBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7Ozs7Ozs7Ozs7Ozs7SUFDSSxrQ0FBVzs7Ozs7Ozs7Ozs7O0lBQWxCLFVBQW1CLEtBQVU7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7OztJQUNLLGdDQUFTOzs7Ozs7Ozs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUF0RmEsc0JBQVMsR0FBVyxPQUFPLENBQUM7O2dCQUgzQyxVQUFVOzs7O2dCQTlCd0IsUUFBUTtnQkFHbEMsZUFBZTs7SUFxSHhCLG1CQUFDO0NBQUEsQUExRkQsSUEwRkM7U0F6RlksWUFBWTs7O0lBRXZCLHVCQUEwQzs7Ozs7SUFFMUMsOEJBQXVCOzs7OztJQUN2Qiw4QkFBbUU7Ozs7O0lBRXZELGdDQUEwQjs7Ozs7SUFBRSx1Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlIH0gZnJvbSBcIi4vZWxlY3Ryb24uc2VydmljZVwiO1xuXG4vKipcbiAqIEZlaGxlci1CZWhhbmRsdW5nXG4gKlxuICogRnVlciBhbGxnZW1laW5lIEZlaGxlciBtdXNzIGRpZSBBbndlbmR1bmcgZWluZSBSb3V0ZSBmdWVyIFwiL2Vycm9yXCIgYmVyZWl0c3RlbGxlbi5cbiAqXG4gKiBXZW5uIGRpZSBBbndlbmR1bmcgbmV1IGdlbGFkZW4gd2VyZGVuIHNvbGwsIGlzdCBGb2xnZW5kZXMgenUgYmVhY2h0ZW46XG4gKlxuICogSW0gQnJvd3NlciB3aXJkIGRlciBSZWxvYWQgbWl0IGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpIGVybGVkaWd0LlxuICpcbiAqIEluIGVsZWN0cm9uIHd1ZXJkZSBkYXMgbmljaHQgZnVua3Rpb25pZXJlbiAoenVtaW5kZXN0IG5pY2h0IG1pdCBBbmd1bGFyLVNQQSkuXG4gKiBEYSBtdXNzIGRlciBSZWxvYWQgYXVmIGRlciBlbGVjdHJvbi1TZWl0ZSBlcmZvbGdlbi4gSW0gZWxlY3Ryb24gc3RhcnQtc2NyaXB0XG4gKiBzaWVodCBkYXMgaW4gZXR3YSBzbyBhdXM6XG4gKiA8cHJlPlxuICogICBpcGNNYWluLm9uKFwicmVsb2FkLWFwcFwiLCBmdW5jdGlvbihldmVudCwgYXJnKSB7XG4gKiAgICAgY29uc29sZS5sb2coXCJBUFAgUkVMT0FEIFwiICsgYXJnKTtcbiAqICAgICBtYWluV2luZG93LmxvYWRVUkwodXJsLmZvcm1hdCh7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogJ2ZpbGU6JyxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xhc2hlczogdHJ1ZVxuICogICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gKiAgIH0pO1xuICogPC9wcmU+XG4gKlxuICovXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVycm9yU2VydmljZSBpbXBsZW1lbnRzIEVycm9ySGFuZGxlciB7XG5cbiAgcHVibGljIHN0YXRpYyBlcnJvclBhZ2U6IHN0cmluZyA9IFwiZXJyb3JcIjtcblxuICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xuICBwcml2YXRlIHJlYWRvbmx5IGVycm9yczogQXJyYXk8eyB0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgZWxlY3Ryb25TZXJ2aWNlOiBFbGVjdHJvblNlcnZpY2UpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiYyd0b3IgRXJyb3JTZXJ2aWNlXCIpO1xuICAgIHRoaXMuZXJyb3JzID0gW107XG4gIH1cblxuICAvKipcbiAgICogRmVobGVyc2VpdGUgYW56ZWlnZW5cbiAgICpcbiAgICogRGllIEFud2VuZHVuZyBtdXNzIGVpbmUgUm91dGUgZnVlciBcIi9lcnJvclwiIGJlcmVpdHN0ZWxsZW4uXG4gICAqXG4gICAqIHBhcmFtIHtzdHJpbmd9IHNob3J0XG4gICAqIHBhcmFtIHtzdHJpbmd9IGRlc2NcbiAgICovXG4gIHB1YmxpYyBuZXdFcnJvcihzaG9ydDogc3RyaW5nLCBkZXNjOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMucm91dGVyKSB7XG4gICAgICB0aGlzLnJvdXRlciA9IHRoaXMuZ2V0Um91dGVyKCk7XG4gICAgfVxuICAgIHRoaXMuZXJyb3JzLnB1c2goe3RpdGxlOiBzaG9ydCwgbWVzc2FnZTogZGVzY30pO1xuICAgIGNvbnNvbGUuZGVidWcoXCIqKiBuZXdFcnJvclwiKTtcbiAgICBjb25zb2xlLmRlYnVnKHNob3J0ICsgXCIgLSBcIiArIGRlc2MpO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9cIiArIEVycm9yU2VydmljZS5lcnJvclBhZ2VdKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMYXN0RXJyb3IoKSB7XG4gICAgaWYgKHRoaXMuZXJyb3JzICYmIHRoaXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9ycy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbndlbmR1bmcgbmV1IGxhZGVuXG4gICAqXG4gICAqIEltIEJyb3dzZXIgd2lyZCBkYXMgbWl0IGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpIGVybGVkaWd0LlxuICAgKlxuICAgKiBJbiBlbGVjdHJvbiB3dWVyZGUgZGFzIG5pY2h0IGZ1bmt0aW9uaWVyZW4gKHp1bWluZGVzdCBuaWNodCBtaXQgQW5ndWxhci1TUEEpLlxuICAgKiBEYSBtdXNzIGRlciBSZWxvYWQgYXVmIGRlciBlbGVjdHJvbi1TZWl0ZSBlcmZvbGdlbi4gSW0gZWxlY3Ryb24gc3RhcnQtc2NyaXB0XG4gICAqIHNpZWh0IGRhcyBpbiBldHdhIHNvIGF1czpcbiAgICogPHByZT5cbiAgICogICBpcGNNYWluLm9uKFwicmVsb2FkLWFwcFwiLCBmdW5jdGlvbihldmVudCwgYXJnKSB7XG4gICAqICAgICBjb25zb2xlLmxvZyhcIkFQUCBSRUxPQUQgXCIgKyBhcmcpO1xuICAgKiAgICAgbWFpbldpbmRvdy5sb2FkVVJMKHVybC5mb3JtYXQoe1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiAnZmlsZTonLFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsYXNoZXM6IHRydWVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAqICAgfSk7XG4gICAqIDwvcHJlPlxuICAgKi9cbiAgcHVibGljIHJlc2V0QXBwKCkge1xuICAgIGlmICh0aGlzLmVsZWN0cm9uU2VydmljZS5pc0VsZWN0cm9uKSB7XG4gICAgICB0aGlzLmVsZWN0cm9uU2VydmljZS5pcGNSZW5kZXJlci5zZW5kKFwicmVsb2FkLWFwcFwiLCBcImVycm9yU2VydmljZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24hLnJlbG9hZCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWmVudHJhbGVyIEV4Y2VwdGlvbi1IYW5kbGVyXG4gICAqXG4gICAqIGluIEFwcE1vZHVsZTpcbiAgICogIHByb3ZpZGVyczogW3twcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBFcnJvclNlcnZpY2V9XVxuICAgKlxuICAgKiB7QGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb3JlL0Vycm9ySGFuZGxlcn1cbiAgICpcbiAgICogcGFyYW0gZXJyb3JcbiAgICovXG4gIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIioqIGhhbmRsZUVycm9yXCIpO1xuICAgIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICB0aGlzLm5ld0Vycm9yKFwiQW53ZW5kdW5nc2ZlaGxlclwiLCBlcnJvcik7XG4gIH1cblxuICAvKlxuICAgIFJvdXRlciBrYW5uIG5pY2h0IHBlciBESSBnZWhvbHQgd2VyZGVuLCBkYSBkYXMgZWluZSB6eWtsaXNjaGUgQWJoYWVuZ2lna2VpdCBhdXNsb2VzdCAoSHR0cCAtPiBSb3V0ZXItPiBIdHRwKVxuICAgIFdlbm4gUm91dGVyIHNwYWV0ZXIgZ2Vob2x0IHdpcmQsIGdpYnQgZXMga2VpbmUgUHJvYmxlbWUuIEVudHNwcmljaHQgbmljaHQgZGVyIHJlaW5lbiBMZWhyZSAtPiB3ZW5uIG1hbCBaZWl0IGlzdFxuICAgIC0+IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5NzY3MDE5XG4gICAqL1xuICBwcml2YXRlIGdldFJvdXRlcigpOiBSb3V0ZXIge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChSb3V0ZXIpO1xuICB9XG59XG4iXX0=