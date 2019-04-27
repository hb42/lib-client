var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            var webserver;
            var _this = this;
            return __generator(this, function (_a) {
                webserver = this.location.prepareExternalUrl("");
                return [2 /*return*/, this.http.get(webserver + "package.json").toPromise()
                        .then((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) { return __awaiter(_this, void 0, void 0, function () {
                        var gh, e_1;
                        var _this = this;
                        return __generator(this, function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEVBQ0wsVUFBVSxHQUNYLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JEO0lBS0Usd0JBQW9CLElBQWdCLEVBQVUsZUFBZ0MsRUFDMUQsUUFBa0I7UUFEbEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMxRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3RDLENBQUM7SUFFRCxzQkFBVywrQkFBRzs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcscUNBQVM7Ozs7UUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7OztJQUNVLDZCQUFJOzs7Ozs7Ozs7O0lBQWpCLFVBQWtCLGFBQXFCOzs7OztnQkFDL0IsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO2dCQUN0RCxzQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFO3lCQUN2RCxJQUFJOzs7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LE9BQU87WUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsS0FBSyxFQUFFLFFBQVE7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnQkFyRkYsVUFBVTs7OztnQkFWVCxVQUFVO2dCQU9ILGVBQWU7Z0JBWGYsUUFBUTs7SUFxR2pCLHFCQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0F0RlksY0FBYzs7Ozs7O0lBQ3pCLGlDQUF5Qjs7Ozs7SUFDekIsdUNBQStCOzs7OztJQUVuQiw4QkFBd0I7Ozs7O0lBQUUseUNBQXdDOzs7OztJQUNsRSxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tIFwic2VtdmVyXCI7XG5cbmltcG9ydCB7XG4gIEh0dHBDbGllbnQsXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlIH0gZnJvbSBcIi4vZWxlY3Ryb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gXCIuL3ZlcnNpb25cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnNpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2ZXJzaW9uOiBWZXJzaW9uO1xuICBwcml2YXRlIHNlcnZlcnZlcnNpb246IFZlcnNpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGVsZWN0cm9uU2VydmljZTogRWxlY3Ryb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXIoKTogVmVyc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuICBwdWJsaWMgZ2V0IHNlcnZlclZlcigpOiBWZXJzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJ2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcnNpb25zLVJlc291cmNlIGF1cyBwYWNrYWdlLmpzb24gaW5pdGlhbGlzaWVyZW4uXG4gICAqIERlciBTdHJpbmcgc2VydmVyUGFja2FnZSBtdXNzIGVpbmUgVVJMIGZ1ZXIgZGllIFNlcnZlci1SRVNULUFQSSBlbnRoYWx0ZW4sXG4gICAqIGRlcmVuIEF1ZnJ1ZiBkaWUgcGFja2FnZS5qc29uIGRlcyBTZXJ2ZXJzIGxpZWZlcnQuXG4gICAqXG4gICAqIHBhcmFtIHtzdHJpbmd9IHNlcnZlclBhY2thZ2VcbiAgICogcmV0dXJucyB7UHJvbWlzZTxWZXJzaW9uPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbml0KHNlcnZlclBhY2thZ2U6IHN0cmluZyk6IFByb21pc2U8VmVyc2lvbj4ge1xuICAgIGNvbnN0IHdlYnNlcnZlciA9IHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKFwiXCIpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHdlYnNlcnZlciArIFwicGFja2FnZS5qc29uXCIpLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKGFzeW5jIChyOiBhbnkpID0+IHtcbiAgICAgICAgICByW1widmVyc2lvbnNcIl0gPSBbXCJBbmd1bGFyIFwiICsgVkVSU0lPTi5mdWxsXTtcbiAgICAgICAgICBpZiAodGhpcy5lbGVjdHJvblNlcnZpY2UuaXNFbGVjdHJvbikge1xuICAgICAgICAgICAgcltcInZlcnNpb25zXCJdLnB1c2goXCJFbGVjdHJvbiBcIiArIHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmVsZWN0cm9uVmVyc2lvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBnaCA9IGF3YWl0IHRoaXMuaHR0cC5nZXQod2Vic2VydmVyICsgXCJyZXNvdXJjZS9naXQudHh0XCIsIHsgcmVzcG9uc2VUeXBlOiBcInRleHRcIiB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIHJbXCJnaXRoYXNoXCJdID0gZ2gucmVwbGFjZSgvXFxuLywgXCJcIikucmVwbGFjZSgvXFxyLywgXCJcIik7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZlaGxlciBiZWltIExlc2VuIHZvbiAuL3Jlc291cmNlL2dpdC50eHRcIik7XG4gICAgICAgICAgICByW1wiZ2l0aGFzaFwiXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHRoaXMubWFrZVZlcihyKTtcbiAgICAgICAgICBpZiAoc2VydmVyUGFja2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyUGFja2FnZSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAudGhlbigoc3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVydmVyc2lvbiA9IHRoaXMubWFrZVZlcihzcik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGZWhsZXIgYmVpbSBFcm1pdHRlbG4gZGVyIFNlcnZlci1WZXJzaW9uOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VWZXIocGFjazogYW55KTogVmVyc2lvbiB7XG4gICAgY29uc3QgcHJlID0gc2VtdmVyLnByZXJlbGVhc2UocGFjay52ZXJzaW9uKTsgLy8gflsnYWxwaGEnLCAxMF1cbiAgICBsZXQgcHJlcmVsID0gXCJcIjtcbiAgICBsZXQgcHJlYnVpbGQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgIGlmIChwcmUgJiYgcHJlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0eXBlb2YgcHJlWzBdID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHByZWJ1aWxkID0gK3ByZVswXTtcbiAgICAgICAgcHJlcmVsID0gXCJiZXRhXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmVyZWwgPSBwcmVbMF07XG4gICAgICAgIHByZWJ1aWxkID0gdHlwZW9mIHByZVsxXSA9PT0gXCJudW1iZXJcIiA/ICtwcmVbMV0gOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uID0ge1xuICAgICAgbmFtZTogcGFjay5uYW1lLFxuICAgICAgZGlzcGxheW5hbWU6IHBhY2suZGlzcGxheW5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogcGFjay5kZXNjcmlwdGlvbixcbiAgICAgIHZlcnNpb246IHBhY2sudmVyc2lvbixcbiAgICAgIGNvcHlyaWdodDogcGFjay5jb3B5cmlnaHQsXG4gICAgICBhdXRob3I6IHBhY2suYXV0aG9yLFxuICAgICAgbGljZW5zZTogcGFjay5saWNlbnNlLFxuICAgICAgbWFqb3I6IHNlbXZlci5tYWpvcihwYWNrLnZlcnNpb24pLFxuICAgICAgbWlub3I6IHNlbXZlci5taW5vcihwYWNrLnZlcnNpb24pLFxuICAgICAgcGF0Y2g6IHNlbXZlci5wYXRjaChwYWNrLnZlcnNpb24pLFxuICAgICAgcHJlcmVsZWFzZTogcHJlcmVsLFxuICAgICAgYnVpbGQ6IHByZWJ1aWxkLFxuICAgICAgZ2l0aGFzaDogcGFjay5naXRoYXNoID8gcGFjay5naXRoYXNoIDogXCJcIixcbiAgICAgIHZlcnNpb25zOiBwYWNrLnZlcnNpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cblxufVxuIl19