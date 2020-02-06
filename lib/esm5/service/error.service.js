import { __decorate } from "tslib";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
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
    ErrorService_1 = ErrorService;
    /**
     * Fehlerseite anzeigen
     *
     * Die Anwendung muss eine Route fuer "/error" bereitstellen.
     *
     * param {string} short
     * param {string} desc
     */
    ErrorService.prototype.newError = function (short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService_1.errorPage]);
    };
    ErrorService.prototype.getLastError = function () {
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
    ErrorService.prototype.resetApp = function () {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            document.location.reload(true);
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
    ErrorService.prototype.handleError = function (error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    };
    /*
      Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
      Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    ErrorService.prototype.getRouter = function () {
        return this.injector.get(Router);
    };
    var ErrorService_1;
    ErrorService.errorPage = "error";
    ErrorService.ctorParameters = function () { return [
        { type: Injector },
        { type: ElectronService }
    ]; };
    ErrorService = ErrorService_1 = __decorate([
        Injectable()
    ], ErrorService);
    return ErrorService;
}());
export { ErrorService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2Vycm9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFdBQVc7QUFFWDtJQU9FLHNCQUFvQixRQUFrQixFQUFVLGVBQWdDO1FBQTVELGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7cUJBVlUsWUFBWTtJQVl2Qjs7Ozs7OztPQU9HO0lBQ0ksK0JBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsSUFBWTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxjQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sbUNBQVksR0FBbkI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0ksK0JBQVEsR0FBZjtRQUNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNyRTthQUFNO1lBQ0wsUUFBUSxDQUFDLFFBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksa0NBQVcsR0FBbEIsVUFBbUIsS0FBVTtRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZ0NBQVMsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7O0lBdEZhLHNCQUFTLEdBQVcsT0FBTyxDQUFDOztnQkFLWixRQUFRO2dCQUEyQixlQUFlOztJQVByRSxZQUFZO1FBRHhCLFVBQVUsRUFBRTtPQUNBLFlBQVksQ0F5RnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXpGRCxJQXlGQztTQXpGWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEVsZWN0cm9uU2VydmljZSB9IGZyb20gXCIuL2VsZWN0cm9uLnNlcnZpY2VcIjtcblxuLyoqXG4gKiBGZWhsZXItQmVoYW5kbHVuZ1xuICpcbiAqIEZ1ZXIgYWxsZ2VtZWluZSBGZWhsZXIgbXVzcyBkaWUgQW53ZW5kdW5nIGVpbmUgUm91dGUgZnVlciBcIi9lcnJvclwiIGJlcmVpdHN0ZWxsZW4uXG4gKlxuICogV2VubiBkaWUgQW53ZW5kdW5nIG5ldSBnZWxhZGVuIHdlcmRlbiBzb2xsLCBpc3QgRm9sZ2VuZGVzIHp1IGJlYWNodGVuOlxuICpcbiAqIEltIEJyb3dzZXIgd2lyZCBkZXIgUmVsb2FkIG1pdCBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKSBlcmxlZGlndC5cbiAqXG4gKiBJbiBlbGVjdHJvbiB3dWVyZGUgZGFzIG5pY2h0IGZ1bmt0aW9uaWVyZW4gKHp1bWluZGVzdCBuaWNodCBtaXQgQW5ndWxhci1TUEEpLlxuICogRGEgbXVzcyBkZXIgUmVsb2FkIGF1ZiBkZXIgZWxlY3Ryb24tU2VpdGUgZXJmb2xnZW4uIEltIGVsZWN0cm9uIHN0YXJ0LXNjcmlwdFxuICogc2llaHQgZGFzIGluIGV0d2Egc28gYXVzOlxuICogPHByZT5cbiAqICAgaXBjTWFpbi5vbihcInJlbG9hZC1hcHBcIiwgZnVuY3Rpb24oZXZlbnQsIGFyZykge1xuICogICAgIGNvbnNvbGUubG9nKFwiQVBQIFJFTE9BRCBcIiArIGFyZyk7XG4gKiAgICAgbWFpbldpbmRvdy5sb2FkVVJMKHVybC5mb3JtYXQoe1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2w6ICdmaWxlOicsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsYXNoZXM6IHRydWVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICogICB9KTtcbiAqIDwvcHJlPlxuICpcbiAqL1xuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFcnJvclNlcnZpY2UgaW1wbGVtZW50cyBFcnJvckhhbmRsZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgZXJyb3JQYWdlOiBzdHJpbmcgPSBcImVycm9yXCI7XG5cbiAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcbiAgcHJpdmF0ZSByZWFkb25seSBlcnJvcnM6IEFycmF5PHsgdGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nIH0+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGVsZWN0cm9uU2VydmljZTogRWxlY3Ryb25TZXJ2aWNlKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcImMndG9yIEVycm9yU2VydmljZVwiKTtcbiAgICB0aGlzLmVycm9ycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZlaGxlcnNlaXRlIGFuemVpZ2VuXG4gICAqXG4gICAqIERpZSBBbndlbmR1bmcgbXVzcyBlaW5lIFJvdXRlIGZ1ZXIgXCIvZXJyb3JcIiBiZXJlaXRzdGVsbGVuLlxuICAgKlxuICAgKiBwYXJhbSB7c3RyaW5nfSBzaG9ydFxuICAgKiBwYXJhbSB7c3RyaW5nfSBkZXNjXG4gICAqL1xuICBwdWJsaWMgbmV3RXJyb3Ioc2hvcnQ6IHN0cmluZywgZGVzYzogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnJvdXRlcikge1xuICAgICAgdGhpcy5yb3V0ZXIgPSB0aGlzLmdldFJvdXRlcigpO1xuICAgIH1cbiAgICB0aGlzLmVycm9ycy5wdXNoKHt0aXRsZTogc2hvcnQsIG1lc3NhZ2U6IGRlc2N9KTtcbiAgICBjb25zb2xlLmRlYnVnKFwiKiogbmV3RXJyb3JcIik7XG4gICAgY29uc29sZS5kZWJ1ZyhzaG9ydCArIFwiIC0gXCIgKyBkZXNjKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvXCIgKyBFcnJvclNlcnZpY2UuZXJyb3JQYWdlXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGFzdEVycm9yKCkge1xuICAgIGlmICh0aGlzLmVycm9ycyAmJiB0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvcnMucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW53ZW5kdW5nIG5ldSBsYWRlblxuICAgKlxuICAgKiBJbSBCcm93c2VyIHdpcmQgZGFzIG1pdCBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKSBlcmxlZGlndC5cbiAgICpcbiAgICogSW4gZWxlY3Ryb24gd3VlcmRlIGRhcyBuaWNodCBmdW5rdGlvbmllcmVuICh6dW1pbmRlc3QgbmljaHQgbWl0IEFuZ3VsYXItU1BBKS5cbiAgICogRGEgbXVzcyBkZXIgUmVsb2FkIGF1ZiBkZXIgZWxlY3Ryb24tU2VpdGUgZXJmb2xnZW4uIEltIGVsZWN0cm9uIHN0YXJ0LXNjcmlwdFxuICAgKiBzaWVodCBkYXMgaW4gZXR3YSBzbyBhdXM6XG4gICAqIDxwcmU+XG4gICAqICAgaXBjTWFpbi5vbihcInJlbG9hZC1hcHBcIiwgZnVuY3Rpb24oZXZlbnQsIGFyZykge1xuICAgKiAgICAgY29uc29sZS5sb2coXCJBUFAgUkVMT0FEIFwiICsgYXJnKTtcbiAgICogICAgIG1haW5XaW5kb3cubG9hZFVSTCh1cmwuZm9ybWF0KHtcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogJ2ZpbGU6JyxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBzbGFzaGVzOiB0cnVlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgKiAgIH0pO1xuICAgKiA8L3ByZT5cbiAgICovXG4gIHB1YmxpYyByZXNldEFwcCgpIHtcbiAgICBpZiAodGhpcy5lbGVjdHJvblNlcnZpY2UuaXNFbGVjdHJvbikge1xuICAgICAgdGhpcy5lbGVjdHJvblNlcnZpY2UuaXBjUmVuZGVyZXIuc2VuZChcInJlbG9hZC1hcHBcIiwgXCJlcnJvclNlcnZpY2VcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uIS5yZWxvYWQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFplbnRyYWxlciBFeGNlcHRpb24tSGFuZGxlclxuICAgKlxuICAgKiBpbiBBcHBNb2R1bGU6XG4gICAqICBwcm92aWRlcnM6IFt7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogRXJyb3JTZXJ2aWNlfV1cbiAgICpcbiAgICoge0BsaW5rIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29yZS9FcnJvckhhbmRsZXJ9XG4gICAqXG4gICAqIHBhcmFtIGVycm9yXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCIqKiBoYW5kbGVFcnJvclwiKTtcbiAgICBjb25zb2xlLmRpcihlcnJvcik7XG4gICAgdGhpcy5uZXdFcnJvcihcIkFud2VuZHVuZ3NmZWhsZXJcIiwgZXJyb3IpO1xuICB9XG5cbiAgLypcbiAgICBSb3V0ZXIga2FubiBuaWNodCBwZXIgREkgZ2Vob2x0IHdlcmRlbiwgZGEgZGFzIGVpbmUgenlrbGlzY2hlIEFiaGFlbmdpZ2tlaXQgYXVzbG9lc3QgKEh0dHAgLT4gUm91dGVyLT4gSHR0cClcbiAgICBXZW5uIFJvdXRlciBzcGFldGVyIGdlaG9sdCB3aXJkLCBnaWJ0IGVzIGtlaW5lIFByb2JsZW1lLiBFbnRzcHJpY2h0IG5pY2h0IGRlciByZWluZW4gTGVocmUgLT4gd2VubiBtYWwgWmVpdCBpc3RcbiAgICAtPiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zOTc2NzAxOVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRSb3V0ZXIoKTogUm91dGVyIHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoUm91dGVyKTtcbiAgfVxufVxuIl19