var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const webserver = this.location.prepareExternalUrl("");
            return this.http.get(webserver + "package.json").toPromise()
                .then((/**
             * @param {?} r
             * @return {?}
             */
            (r) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxPQUFPLEVBQ0wsVUFBVSxHQUNYLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNMLFVBQVUsRUFDVixPQUFPLEdBQ1IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSXJELE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFJekIsWUFBb0IsSUFBZ0IsRUFBVSxlQUFnQyxFQUMxRCxRQUFrQjtRQURsQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzFELGFBQVEsR0FBUixRQUFRLENBQVU7SUFDdEMsQ0FBQzs7OztJQUVELElBQVcsR0FBRztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBQ0QsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDOzs7Ozs7Ozs7OztJQVVZLElBQUksQ0FBQyxhQUFxQjs7O2tCQUMvQixTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFO2lCQUN2RCxJQUFJOzs7O1lBQUMsQ0FBTyxDQUFNLEVBQUUsRUFBRTtnQkFDckIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFH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QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsVUFBVSxFQUFFLE1BQU07WUFDbEIsS0FBSyxFQUFFLFFBQVE7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUFyRkYsVUFBVTs7OztZQVZULFVBQVU7WUFPSCxlQUFlO1lBWGYsUUFBUTs7Ozs7OztJQWdCZixpQ0FBeUI7Ozs7O0lBQ3pCLHVDQUErQjs7Ozs7SUFFbkIsOEJBQXdCOzs7OztJQUFFLHlDQUF3Qzs7Ozs7SUFDbEUsa0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgKiBhcyBzZW12ZXIgZnJvbSBcInNlbXZlclwiO1xuXG5pbXBvcnQge1xuICBIdHRwQ2xpZW50LFxufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7XG4gIEluamVjdGFibGUsXG4gIFZFUlNJT04sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEVsZWN0cm9uU2VydmljZSB9IGZyb20gXCIuL2VsZWN0cm9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tIFwiLi92ZXJzaW9uXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZXJzaW9uU2VydmljZSB7XG4gIHByaXZhdGUgdmVyc2lvbjogVmVyc2lvbjtcbiAgcHJpdmF0ZSBzZXJ2ZXJ2ZXJzaW9uOiBWZXJzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBlbGVjdHJvblNlcnZpY2U6IEVsZWN0cm9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdmVyKCk6IFZlcnNpb24ge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb247XG4gIH1cbiAgcHVibGljIGdldCBzZXJ2ZXJWZXIoKTogVmVyc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVydmVyc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJzaW9ucy1SZXNvdXJjZSBhdXMgcGFja2FnZS5qc29uIGluaXRpYWxpc2llcmVuLlxuICAgKiBEZXIgU3RyaW5nIHNlcnZlclBhY2thZ2UgbXVzcyBlaW5lIFVSTCBmdWVyIGRpZSBTZXJ2ZXItUkVTVC1BUEkgZW50aGFsdGVuLFxuICAgKiBkZXJlbiBBdWZydWYgZGllIHBhY2thZ2UuanNvbiBkZXMgU2VydmVycyBsaWVmZXJ0LlxuICAgKlxuICAgKiBwYXJhbSB7c3RyaW5nfSBzZXJ2ZXJQYWNrYWdlXG4gICAqIHJldHVybnMge1Byb21pc2U8VmVyc2lvbj59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaW5pdChzZXJ2ZXJQYWNrYWdlOiBzdHJpbmcpOiBQcm9taXNlPFZlcnNpb24+IHtcbiAgICBjb25zdCB3ZWJzZXJ2ZXIgPSB0aGlzLmxvY2F0aW9uLnByZXBhcmVFeHRlcm5hbFVybChcIlwiKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh3ZWJzZXJ2ZXIgKyBcInBhY2thZ2UuanNvblwiKS50b1Byb21pc2UoKVxuICAgICAgICAudGhlbihhc3luYyAocjogYW55KSA9PiB7XG4gICAgICAgICAgcltcInZlcnNpb25zXCJdID0gW1wiQW5ndWxhciBcIiArIFZFUlNJT04uZnVsbF07XG4gICAgICAgICAgaWYgKHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmlzRWxlY3Ryb24pIHtcbiAgICAgICAgICAgIHJbXCJ2ZXJzaW9uc1wiXS5wdXNoKFwiRWxlY3Ryb24gXCIgKyB0aGlzLmVsZWN0cm9uU2VydmljZS5lbGVjdHJvblZlcnNpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZ2ggPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KHdlYnNlcnZlciArIFwicmVzb3VyY2UvZ2l0LnR4dFwiLCB7IHJlc3BvbnNlVHlwZTogXCJ0ZXh0XCIgfSkudG9Qcm9taXNlKCk7XG4gICAgICAgICAgICByW1wiZ2l0aGFzaFwiXSA9IGdoLnJlcGxhY2UoL1xcbi8sIFwiXCIpLnJlcGxhY2UoL1xcci8sIFwiXCIpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGZWhsZXIgYmVpbSBMZXNlbiB2b24gLi9yZXNvdXJjZS9naXQudHh0XCIpO1xuICAgICAgICAgICAgcltcImdpdGhhc2hcIl0gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ha2VWZXIocik7XG4gICAgICAgICAgaWYgKHNlcnZlclBhY2thZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclBhY2thZ2UpLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNyKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlcnZlcnNpb24gPSB0aGlzLm1ha2VWZXIoc3IpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmVobGVyIGJlaW0gRXJtaXR0ZWxuIGRlciBTZXJ2ZXItVmVyc2lvbjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlVmVyKHBhY2s6IGFueSk6IFZlcnNpb24ge1xuICAgIGNvbnN0IHByZSA9IHNlbXZlci5wcmVyZWxlYXNlKHBhY2sudmVyc2lvbik7IC8vIH5bJ2FscGhhJywgMTBdXG4gICAgbGV0IHByZXJlbCA9IFwiXCI7XG4gICAgbGV0IHByZWJ1aWxkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgICBpZiAocHJlICYmIHByZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodHlwZW9mIHByZVswXSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBwcmVidWlsZCA9ICtwcmVbMF07XG4gICAgICAgIHByZXJlbCA9IFwiYmV0YVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlcmVsID0gcHJlWzBdO1xuICAgICAgICBwcmVidWlsZCA9IHR5cGVvZiBwcmVbMV0gPT09IFwibnVtYmVyXCIgPyArcHJlWzFdIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmVyc2lvbiA9IHtcbiAgICAgIG5hbWU6IHBhY2submFtZSxcbiAgICAgIGRpc3BsYXluYW1lOiBwYWNrLmRpc3BsYXluYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhY2suZGVzY3JpcHRpb24sXG4gICAgICB2ZXJzaW9uOiBwYWNrLnZlcnNpb24sXG4gICAgICBjb3B5cmlnaHQ6IHBhY2suY29weXJpZ2h0LFxuICAgICAgYXV0aG9yOiBwYWNrLmF1dGhvcixcbiAgICAgIGxpY2Vuc2U6IHBhY2subGljZW5zZSxcbiAgICAgIG1ham9yOiBzZW12ZXIubWFqb3IocGFjay52ZXJzaW9uKSxcbiAgICAgIG1pbm9yOiBzZW12ZXIubWlub3IocGFjay52ZXJzaW9uKSxcbiAgICAgIHBhdGNoOiBzZW12ZXIucGF0Y2gocGFjay52ZXJzaW9uKSxcbiAgICAgIHByZXJlbGVhc2U6IHByZXJlbCxcbiAgICAgIGJ1aWxkOiBwcmVidWlsZCxcbiAgICAgIGdpdGhhc2g6IHBhY2suZ2l0aGFzaCA/IHBhY2suZ2l0aGFzaCA6IFwiXCIsXG4gICAgICB2ZXJzaW9uczogcGFjay52ZXJzaW9ucyxcbiAgICB9O1xuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbn1cbiJdfQ==