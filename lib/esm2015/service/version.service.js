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
export class VersionService {
    /**
     * @param {?} http
     * @param {?} electronService
     * @param {?} location
     */
    constructor(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    /**
     * @return {?}
     */
    get ver() {
        return this.version;
    }
    /**
     * @return {?}
     */
    get serverVer() {
        return this.serverversion;
    }
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
    init(serverPackage) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const webserver = this.location.prepareExternalUrl("");
            return this.http.get(webserver + "package.json").toPromise()
                .then((/**
             * @param {?} r
             * @return {?}
             */
            (r) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                r["versions"] = ["Angular " + VERSION.full];
                if (this.electronService.isElectron) {
                    r["versions"].push("Electron " + this.electronService.electronVersion);
                }
                try {
                    /** @type {?} */
                    const gh = yield this.http.get(webserver + "resource/git.txt", { responseType: "text" }).toPromise();
                    r["githash"] = gh.replace(/\n/, "").replace(/\r/, "");
                }
                catch (e) {
                    console.error("Fehler beim Lesen von ./resource/git.txt");
                    r["githash"] = "";
                }
                this.version = this.makeVer(r);
                if (serverPackage) {
                    return this.http.get(serverPackage).toPromise()
                        .then((/**
                     * @param {?} sr
                     * @return {?}
                     */
                    (sr) => {
                        this.serverversion = this.makeVer(sr);
                        return this.version;
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    (err) => {
                        console.error("Fehler beim Ermitteln der Server-Version: " + err);
                        return this.version;
                    }));
                }
                else {
                    return this.version;
                }
            })));
        });
    }
    /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    makeVer(pack) {
        /** @type {?} */
        const pre = semver.prerelease(pack.version);
        // ~['alpha', 10]
        /** @type {?} */
        let prerel = "";
        /** @type {?} */
        let prebuild = null;
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
        const version = {
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
    }
}
VersionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VersionService.ctorParameters = () => [
    { type: HttpClient },
    { type: ElectronService },
    { type: Location }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJckQsTUFBTSxPQUFPLGNBQWM7Ozs7OztJQUl6QixZQUFvQixJQUFnQixFQUFVLGVBQWdDLEVBQzFELFFBQWtCO1FBRGxCLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDMUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN0QyxDQUFDOzs7O0lBRUQsSUFBVyxHQUFHO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFDRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7Ozs7O0lBVVksSUFBSSxDQUFDLGFBQXFCOzs7a0JBQy9CLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUU7aUJBQ3ZELElBQUk7Ozs7WUFBQyxDQUFPLENBQU0sRUFBRSxFQUFFO2dCQUNyQixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsT0FBTyxD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Q0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxVQUFVLEVBQUUsTUFBTTtZQUNsQixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OztZQXJGRixVQUFVOzs7O1lBVlQsVUFBVTtZQU9ILGVBQWU7WUFYZixRQUFROzs7Ozs7O0lBZ0JmLGlDQUF5Qjs7Ozs7SUFDekIsdUNBQStCOzs7OztJQUVuQiw4QkFBd0I7Ozs7O0lBQUUseUNBQXdDOzs7OztJQUNsRSxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tIFwic2VtdmVyXCI7XG5cbmltcG9ydCB7XG4gIEh0dHBDbGllbnQsXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlIH0gZnJvbSBcIi4vZWxlY3Ryb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gXCIuL3ZlcnNpb25cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnNpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2ZXJzaW9uOiBWZXJzaW9uO1xuICBwcml2YXRlIHNlcnZlcnZlcnNpb246IFZlcnNpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGVsZWN0cm9uU2VydmljZTogRWxlY3Ryb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXIoKTogVmVyc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuICBwdWJsaWMgZ2V0IHNlcnZlclZlcigpOiBWZXJzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJ2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcnNpb25zLVJlc291cmNlIGF1cyBwYWNrYWdlLmpzb24gaW5pdGlhbGlzaWVyZW4uXG4gICAqIERlciBTdHJpbmcgc2VydmVyUGFja2FnZSBtdXNzIGVpbmUgVVJMIGZ1ZXIgZGllIFNlcnZlci1SRVNULUFQSSBlbnRoYWx0ZW4sXG4gICAqIGRlcmVuIEF1ZnJ1ZiBkaWUgcGFja2FnZS5qc29uIGRlcyBTZXJ2ZXJzIGxpZWZlcnQuXG4gICAqXG4gICAqIHBhcmFtIHtzdHJpbmd9IHNlcnZlclBhY2thZ2VcbiAgICogcmV0dXJucyB7UHJvbWlzZTxWZXJzaW9uPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbml0KHNlcnZlclBhY2thZ2U6IHN0cmluZyk6IFByb21pc2U8VmVyc2lvbj4ge1xuICAgIGNvbnN0IHdlYnNlcnZlciA9IHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKFwiXCIpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHdlYnNlcnZlciArIFwicGFja2FnZS5qc29uXCIpLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKGFzeW5jIChyOiBhbnkpID0+IHtcbiAgICAgICAgICByW1widmVyc2lvbnNcIl0gPSBbXCJBbmd1bGFyIFwiICsgVkVSU0lPTi5mdWxsXTtcbiAgICAgICAgICBpZiAodGhpcy5lbGVjdHJvblNlcnZpY2UuaXNFbGVjdHJvbikge1xuICAgICAgICAgICAgcltcInZlcnNpb25zXCJdLnB1c2goXCJFbGVjdHJvbiBcIiArIHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmVsZWN0cm9uVmVyc2lvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBnaCA9IGF3YWl0IHRoaXMuaHR0cC5nZXQod2Vic2VydmVyICsgXCJyZXNvdXJjZS9naXQudHh0XCIsIHsgcmVzcG9uc2VUeXBlOiBcInRleHRcIiB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIHJbXCJnaXRoYXNoXCJdID0gZ2gucmVwbGFjZSgvXFxuLywgXCJcIikucmVwbGFjZSgvXFxyLywgXCJcIik7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZlaGxlciBiZWltIExlc2VuIHZvbiAuL3Jlc291cmNlL2dpdC50eHRcIik7XG4gICAgICAgICAgICByW1wiZ2l0aGFzaFwiXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHRoaXMubWFrZVZlcihyKTtcbiAgICAgICAgICBpZiAoc2VydmVyUGFja2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyUGFja2FnZSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAudGhlbigoc3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVydmVyc2lvbiA9IHRoaXMubWFrZVZlcihzcik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGZWhsZXIgYmVpbSBFcm1pdHRlbG4gZGVyIFNlcnZlci1WZXJzaW9uOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VWZXIocGFjazogYW55KTogVmVyc2lvbiB7XG4gICAgY29uc3QgcHJlID0gc2VtdmVyLnByZXJlbGVhc2UocGFjay52ZXJzaW9uKTsgLy8gflsnYWxwaGEnLCAxMF1cbiAgICBsZXQgcHJlcmVsID0gXCJcIjtcbiAgICBsZXQgcHJlYnVpbGQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAgIGlmIChwcmUgJiYgcHJlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0eXBlb2YgcHJlWzBdID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHByZWJ1aWxkID0gK3ByZVswXTtcbiAgICAgICAgcHJlcmVsID0gXCJiZXRhXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmVyZWwgPSBwcmVbMF07XG4gICAgICAgIHByZWJ1aWxkID0gdHlwZW9mIHByZVsxXSA9PT0gXCJudW1iZXJcIiA/ICtwcmVbMV0gOiAwO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9uID0ge1xuICAgICAgbmFtZTogcGFjay5uYW1lLFxuICAgICAgZGlzcGxheW5hbWU6IHBhY2suZGlzcGxheW5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogcGFjay5kZXNjcmlwdGlvbixcbiAgICAgIHZlcnNpb246IHBhY2sudmVyc2lvbixcbiAgICAgIGNvcHlyaWdodDogcGFjay5jb3B5cmlnaHQsXG4gICAgICBhdXRob3I6IHBhY2suYXV0aG9yLFxuICAgICAgbGljZW5zZTogcGFjay5saWNlbnNlLFxuICAgICAgbWFqb3I6IHNlbXZlci5tYWpvcihwYWNrLnZlcnNpb24pLFxuICAgICAgbWlub3I6IHNlbXZlci5taW5vcihwYWNrLnZlcnNpb24pLFxuICAgICAgcGF0Y2g6IHNlbXZlci5wYXRjaChwYWNrLnZlcnNpb24pLFxuICAgICAgcHJlcmVsZWFzZTogcHJlcmVsLFxuICAgICAgYnVpbGQ6IHByZWJ1aWxkLFxuICAgICAgZ2l0aGFzaDogcGFjay5naXRoYXNoID8gcGFjay5naXRoYXNoIDogXCJcIixcbiAgICAgIHZlcnNpb25zOiBwYWNrLnZlcnNpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cblxufVxuIl19