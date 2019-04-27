/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Location } from "@angular/common";
import * as semver from "semver";
import { HttpClient, } from "@angular/common/http";
import { Injectable, VERSION, } from "@angular/core";
import { ElectronService } from "./electron.service";
var VersionService = /** @class */ (function () {
    function VersionService(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    Object.defineProperty(VersionService.prototype, "ver", {
        get: /**
         * @return {?}
         */
        function () {
            return this.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionService.prototype, "serverVer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverversion;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     */
    /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     * @param {?} serverPackage
     * @return {?}
     */
    VersionService.prototype.init = /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     * @param {?} serverPackage
     * @return {?}
     */
    function (serverPackage) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var webserver;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                webserver = this.location.prepareExternalUrl("");
                return [2 /*return*/, this.http.get(webserver + "package.json").toPromise()
                        .then((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var gh, e_1;
                        var _this = this;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    r["versions"] = ["Angular " + VERSION.full];
                                    if (this.electronService.isElectron) {
                                        r["versions"].push("Electron " + this.electronService.electronVersion);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.http.get(webserver + "resource/git.txt", { responseType: "text" }).toPromise()];
                                case 2:
                                    gh = _a.sent();
                                    r["githash"] = gh.replace(/\n/, "").replace(/\r/, "");
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.error("Fehler beim Lesen von ./resource/git.txt");
                                    r["githash"] = "";
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.version = this.makeVer(r);
                                    if (serverPackage) {
                                        return [2 /*return*/, this.http.get(serverPackage).toPromise()
                                                .then((/**
                                             * @param {?} sr
                                             * @return {?}
                                             */
                                            function (sr) {
                                                _this.serverversion = _this.makeVer(sr);
                                                return _this.version;
                                            })).catch((/**
                                             * @param {?} err
                                             * @return {?}
                                             */
                                            function (err) {
                                                console.error("Fehler beim Ermitteln der Server-Version: " + err);
                                                return _this.version;
                                            }))];
                                    }
                                    else {
                                        return [2 /*return*/, this.version];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            });
        });
    };
    /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    VersionService.prototype.makeVer = /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    function (pack) {
        /** @type {?} */
        var pre = semver.prerelease(pack.version);
        // ~['alpha', 10]
        /** @type {?} */
        var prerel = "";
        /** @type {?} */
        var prebuild = null;
        if (pre && pre.length > 0) {
            if (typeof pre[0] === "number") {
                prebuild = +pre[0];
                prerel = "beta";
            }
            else {
                prerel = pre[0];
                prebuild = typeof pre[1] === "number" ? +pre[1] : 0;
            }
        }
        /** @type {?} */
        var version = {
            name: pack.name,
            displayname: pack.displayname,
            description: pack.description,
            version: pack.version,
            copyright: pack.copyright,
            author: pack.author,
            license: pack.license,
            major: semver.major(pack.version),
            minor: semver.minor(pack.version),
            patch: semver.patch(pack.version),
            prerelease: prerel,
            build: prebuild,
            githash: pack.githash ? pack.githash : "",
            versions: pack.versions,
        };
        return version;
    };
    VersionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VersionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ElectronService },
        { type: Location }
    ]; };
    return VersionService;
}());
export { VersionService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    VersionService.prototype.version;
    /**
     * @type {?}
     * @private
     */
    VersionService.prototype.serverversion;
    /**
     * @type {?}
     * @private
     */
    VersionService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    VersionService.prototype.electronService;
    /**
     * @type {?}
     * @private
     */
    VersionService.prototype.location;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQ7SUFLRSx3QkFBb0IsSUFBZ0IsRUFBVSxlQUFnQyxFQUMxRCxRQUFrQjtRQURsQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzFELGFBQVEsR0FBUixRQUFRLENBQVU7SUFDdEMsQ0FBQztJQUVELHNCQUFXLCtCQUFHOzs7O1FBQWQ7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxxQ0FBUzs7OztRQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7O0lBQ1UsNkJBQUk7Ozs7Ozs7Ozs7SUFBakIsVUFBa0IsYUFBcUI7Ozs7O2dCQUMvQixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ3RELHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUU7eUJBQ3ZELElBQUk7Ozs7b0JBQUMsVUFBTyxDQUFNOzs7Ozs7b0NBQ2pCLENBQUMs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QUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxVQUFVLEVBQUUsTUFBTTtZQUNsQixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXJGRixVQUFVOzs7O2dCQVZULFVBQVU7Z0JBT0gsZUFBZTtnQkFYZixRQUFROztJQXFHakIscUJBQUM7Q0FBQSxBQXZGRCxJQXVGQztTQXRGWSxjQUFjOzs7Ozs7SUFDekIsaUNBQXlCOzs7OztJQUN6Qix1Q0FBK0I7Ozs7O0lBRW5CLDhCQUF3Qjs7Ozs7SUFBRSx5Q0FBd0M7Ozs7O0lBQ2xFLGtDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0ICogYXMgc2VtdmVyIGZyb20gXCJzZW12ZXJcIjtcblxuaW1wb3J0IHtcbiAgSHR0cENsaWVudCxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge1xuICBJbmplY3RhYmxlLFxuICBWRVJTSU9OLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBFbGVjdHJvblNlcnZpY2UgfSBmcm9tIFwiLi9lbGVjdHJvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSBcIi4vdmVyc2lvblwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVyc2lvblNlcnZpY2Uge1xuICBwcml2YXRlIHZlcnNpb246IFZlcnNpb247XG4gIHByaXZhdGUgc2VydmVydmVyc2lvbjogVmVyc2lvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgZWxlY3Ryb25TZXJ2aWNlOiBFbGVjdHJvblNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHZlcigpOiBWZXJzaW9uIHtcbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICB9XG4gIHB1YmxpYyBnZXQgc2VydmVyVmVyKCk6IFZlcnNpb24ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlcnZlcnNpb247XG4gIH1cblxuICAvKipcbiAgICogVmVyc2lvbnMtUmVzb3VyY2UgYXVzIHBhY2thZ2UuanNvbiBpbml0aWFsaXNpZXJlbi5cbiAgICogRGVyIFN0cmluZyBzZXJ2ZXJQYWNrYWdlIG11c3MgZWluZSBVUkwgZnVlciBkaWUgU2VydmVyLVJFU1QtQVBJIGVudGhhbHRlbixcbiAgICogZGVyZW4gQXVmcnVmIGRpZSBwYWNrYWdlLmpzb24gZGVzIFNlcnZlcnMgbGllZmVydC5cbiAgICpcbiAgICogcGFyYW0ge3N0cmluZ30gc2VydmVyUGFja2FnZVxuICAgKiByZXR1cm5zIHtQcm9taXNlPFZlcnNpb24+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGluaXQoc2VydmVyUGFja2FnZTogc3RyaW5nKTogUHJvbWlzZTxWZXJzaW9uPiB7XG4gICAgY29uc3Qgd2Vic2VydmVyID0gdGhpcy5sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwoXCJcIik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQod2Vic2VydmVyICsgXCJwYWNrYWdlLmpzb25cIikudG9Qcm9taXNlKClcbiAgICAgICAgLnRoZW4oYXN5bmMgKHI6IGFueSkgPT4ge1xuICAgICAgICAgIHJbXCJ2ZXJzaW9uc1wiXSA9IFtcIkFuZ3VsYXIgXCIgKyBWRVJTSU9OLmZ1bGxdO1xuICAgICAgICAgIGlmICh0aGlzLmVsZWN0cm9uU2VydmljZS5pc0VsZWN0cm9uKSB7XG4gICAgICAgICAgICByW1widmVyc2lvbnNcIl0ucHVzaChcIkVsZWN0cm9uIFwiICsgdGhpcy5lbGVjdHJvblNlcnZpY2UuZWxlY3Ryb25WZXJzaW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGdoID0gYXdhaXQgdGhpcy5odHRwLmdldCh3ZWJzZXJ2ZXIgKyBcInJlc291cmNlL2dpdC50eHRcIiwgeyByZXNwb25zZVR5cGU6IFwidGV4dFwiIH0pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgICAgcltcImdpdGhhc2hcIl0gPSBnaC5yZXBsYWNlKC9cXG4vLCBcIlwiKS5yZXBsYWNlKC9cXHIvLCBcIlwiKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmVobGVyIGJlaW0gTGVzZW4gdm9uIC4vcmVzb3VyY2UvZ2l0LnR4dFwiKTtcbiAgICAgICAgICAgIHJbXCJnaXRoYXNoXCJdID0gXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWtlVmVyKHIpO1xuICAgICAgICAgIGlmIChzZXJ2ZXJQYWNrYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJQYWNrYWdlKS50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgIC50aGVuKChzcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJ2ZXJzaW9uID0gdGhpcy5tYWtlVmVyKHNyKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZlaGxlciBiZWltIEVybWl0dGVsbiBkZXIgU2VydmVyLVZlcnNpb246IFwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVZlcihwYWNrOiBhbnkpOiBWZXJzaW9uIHtcbiAgICBjb25zdCBwcmUgPSBzZW12ZXIucHJlcmVsZWFzZShwYWNrLnZlcnNpb24pOyAvLyB+WydhbHBoYScsIDEwXVxuICAgIGxldCBwcmVyZWwgPSBcIlwiO1xuICAgIGxldCBwcmVidWlsZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHByZSAmJiBwcmUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiBwcmVbMF0gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcHJlYnVpbGQgPSArcHJlWzBdO1xuICAgICAgICBwcmVyZWwgPSBcImJldGFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXJlbCA9IHByZVswXTtcbiAgICAgICAgcHJlYnVpbGQgPSB0eXBlb2YgcHJlWzFdID09PSBcIm51bWJlclwiID8gK3ByZVsxXSA6IDA7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHZlcnNpb24gPSB7XG4gICAgICBuYW1lOiBwYWNrLm5hbWUsXG4gICAgICBkaXNwbGF5bmFtZTogcGFjay5kaXNwbGF5bmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBwYWNrLmRlc2NyaXB0aW9uLFxuICAgICAgdmVyc2lvbjogcGFjay52ZXJzaW9uLFxuICAgICAgY29weXJpZ2h0OiBwYWNrLmNvcHlyaWdodCxcbiAgICAgIGF1dGhvcjogcGFjay5hdXRob3IsXG4gICAgICBsaWNlbnNlOiBwYWNrLmxpY2Vuc2UsXG4gICAgICBtYWpvcjogc2VtdmVyLm1ham9yKHBhY2sudmVyc2lvbiksXG4gICAgICBtaW5vcjogc2VtdmVyLm1pbm9yKHBhY2sudmVyc2lvbiksXG4gICAgICBwYXRjaDogc2VtdmVyLnBhdGNoKHBhY2sudmVyc2lvbiksXG4gICAgICBwcmVyZWxlYXNlOiBwcmVyZWwsXG4gICAgICBidWlsZDogcHJlYnVpbGQsXG4gICAgICBnaXRoYXNoOiBwYWNrLmdpdGhhc2ggPyBwYWNrLmdpdGhhc2ggOiBcIlwiLFxuICAgICAgdmVyc2lvbnM6IHBhY2sudmVyc2lvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gdmVyc2lvbjtcbiAgfVxuXG59XG4iXX0=