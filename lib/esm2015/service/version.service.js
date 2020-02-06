import { __awaiter, __decorate } from "tslib";
import { Location } from "@angular/common";
// import { major, minor, patch, prerelease} from "semver";
import * as semver from "semver";
import { HttpClient, } from "@angular/common/http";
import { Injectable, VERSION, } from "@angular/core";
import { ElectronService } from "./electron.service";
let VersionService = class VersionService {
    constructor(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    get ver() {
        return this.version;
    }
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
     */
    init(serverPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            const webserver = this.location.prepareExternalUrl("");
            return this.http.get(webserver + "package.json").toPromise()
                .then((r) => __awaiter(this, void 0, void 0, function* () {
                r["versions"] = ["Angular " + VERSION.full];
                if (this.electronService.isElectron) {
                    r["versions"].push("Electron " + this.electronService.electronVersion);
                }
                try {
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
                        .then((sr) => {
                        this.serverversion = this.makeVer(sr);
                        return this.version;
                    }).catch((err) => {
                        console.error("Fehler beim Ermitteln der Server-Version: " + err);
                        return this.version;
                    });
                }
                else {
                    return this.version;
                }
            }));
        });
    }
    makeVer(pack) {
        const pre = semver.prerelease(pack.version); // ['alpha', 10] || [10]
        let prerel = "";
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
};
VersionService.ctorParameters = () => [
    { type: HttpClient },
    { type: ElectronService },
    { type: Location }
];
VersionService = __decorate([
    Injectable()
], VersionService);
export { VersionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsMkRBQTJEO0FBQzNELE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0wsVUFBVSxFQUNWLE9BQU8sR0FDUixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJckQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUl6QixZQUFvQixJQUFnQixFQUFVLGVBQWdDLEVBQzFELFFBQWtCO1FBRGxCLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDMUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN0QyxDQUFDO0lBRUQsSUFBVyxHQUFHO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ1UsSUFBSSxDQUFDLGFBQXFCOztZQUNyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtpQkFDdkQsSUFBSSxDQUFDLENBQU8sQ0FBTSxFQUFFLEVBQUU7Z0JBQ3JCLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxD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bkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBRUYsQ0FBQTs7WUFsRjJCLFVBQVU7WUFBMkIsZUFBZTtZQUNoRCxRQUFROztBQUwzQixjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0FzRjFCO1NBdEZZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbi8vIGltcG9ydCB7IG1ham9yLCBtaW5vciwgcGF0Y2gsIHByZXJlbGVhc2V9IGZyb20gXCJzZW12ZXJcIjtcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tIFwic2VtdmVyXCI7XG5cbmltcG9ydCB7XG4gIEh0dHBDbGllbnQsXG59IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgVkVSU0lPTixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlIH0gZnJvbSBcIi4vZWxlY3Ryb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gXCIuL3ZlcnNpb25cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZlcnNpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSB2ZXJzaW9uOiBWZXJzaW9uO1xuICBwcml2YXRlIHNlcnZlcnZlcnNpb246IFZlcnNpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGVsZWN0cm9uU2VydmljZTogRWxlY3Ryb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICB9XG5cbiAgcHVibGljIGdldCB2ZXIoKTogVmVyc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbiAgfVxuICBwdWJsaWMgZ2V0IHNlcnZlclZlcigpOiBWZXJzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXJ2ZXJzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcnNpb25zLVJlc291cmNlIGF1cyBwYWNrYWdlLmpzb24gaW5pdGlhbGlzaWVyZW4uXG4gICAqIERlciBTdHJpbmcgc2VydmVyUGFja2FnZSBtdXNzIGVpbmUgVVJMIGZ1ZXIgZGllIFNlcnZlci1SRVNULUFQSSBlbnRoYWx0ZW4sXG4gICAqIGRlcmVuIEF1ZnJ1ZiBkaWUgcGFja2FnZS5qc29uIGRlcyBTZXJ2ZXJzIGxpZWZlcnQuXG4gICAqXG4gICAqIHBhcmFtIHtzdHJpbmd9IHNlcnZlclBhY2thZ2VcbiAgICogcmV0dXJucyB7UHJvbWlzZTxWZXJzaW9uPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBpbml0KHNlcnZlclBhY2thZ2U6IHN0cmluZyk6IFByb21pc2U8VmVyc2lvbj4ge1xuICAgIGNvbnN0IHdlYnNlcnZlciA9IHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKFwiXCIpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHdlYnNlcnZlciArIFwicGFja2FnZS5qc29uXCIpLnRvUHJvbWlzZSgpXG4gICAgICAgIC50aGVuKGFzeW5jIChyOiBhbnkpID0+IHtcbiAgICAgICAgICByW1widmVyc2lvbnNcIl0gPSBbXCJBbmd1bGFyIFwiICsgVkVSU0lPTi5mdWxsXTtcbiAgICAgICAgICBpZiAodGhpcy5lbGVjdHJvblNlcnZpY2UuaXNFbGVjdHJvbikge1xuICAgICAgICAgICAgcltcInZlcnNpb25zXCJdLnB1c2goXCJFbGVjdHJvbiBcIiArIHRoaXMuZWxlY3Ryb25TZXJ2aWNlLmVsZWN0cm9uVmVyc2lvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBnaCA9IGF3YWl0IHRoaXMuaHR0cC5nZXQod2Vic2VydmVyICsgXCJyZXNvdXJjZS9naXQudHh0XCIsIHsgcmVzcG9uc2VUeXBlOiBcInRleHRcIiB9KS50b1Byb21pc2UoKTtcbiAgICAgICAgICAgIHJbXCJnaXRoYXNoXCJdID0gZ2gucmVwbGFjZSgvXFxuLywgXCJcIikucmVwbGFjZSgvXFxyLywgXCJcIik7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZlaGxlciBiZWltIExlc2VuIHZvbiAuL3Jlc291cmNlL2dpdC50eHRcIik7XG4gICAgICAgICAgICByW1wiZ2l0aGFzaFwiXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHRoaXMubWFrZVZlcihyKTtcbiAgICAgICAgICBpZiAoc2VydmVyUGFja2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyUGFja2FnZSkudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAudGhlbigoc3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVydmVyc2lvbiA9IHRoaXMubWFrZVZlcihzcik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGZWhsZXIgYmVpbSBFcm1pdHRlbG4gZGVyIFNlcnZlci1WZXJzaW9uOiBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VWZXIocGFjazogYW55KTogVmVyc2lvbiB7XG4gICAgY29uc3QgcHJlID0gc2VtdmVyLnByZXJlbGVhc2UocGFjay52ZXJzaW9uKTsgLy8gWydhbHBoYScsIDEwXSB8fCBbMTBdXG4gICAgbGV0IHByZXJlbCA9IFwiXCI7XG4gICAgbGV0IHByZWJ1aWxkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgICBpZiAocHJlICYmIHByZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodHlwZW9mIHByZVswXSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICBwcmVidWlsZCA9ICtwcmVbMF07XG4gICAgICAgIHByZXJlbCA9IFwiYmV0YVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlcmVsID0gcHJlWzBdO1xuICAgICAgICBwcmVidWlsZCA9IHR5cGVvZiBwcmVbMV0gPT09IFwibnVtYmVyXCIgPyArcHJlWzFdIDogMDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdmVyc2lvbiA9IHtcbiAgICAgIG5hbWU6IHBhY2submFtZSxcbiAgICAgIGRpc3BsYXluYW1lOiBwYWNrLmRpc3BsYXluYW1lLFxuICAgICAgZGVzY3JpcHRpb246IHBhY2suZGVzY3JpcHRpb24sXG4gICAgICB2ZXJzaW9uOiBwYWNrLnZlcnNpb24sXG4gICAgICBjb3B5cmlnaHQ6IHBhY2suY29weXJpZ2h0LFxuICAgICAgYXV0aG9yOiBwYWNrLmF1dGhvcixcbiAgICAgIGxpY2Vuc2U6IHBhY2subGljZW5zZSxcbiAgICAgIG1ham9yOiBzZW12ZXIubWFqb3IocGFjay52ZXJzaW9uKSxcbiAgICAgIG1pbm9yOiBzZW12ZXIubWlub3IocGFjay52ZXJzaW9uKSxcbiAgICAgIHBhdGNoOiBzZW12ZXIucGF0Y2gocGFjay52ZXJzaW9uKSxcbiAgICAgIHByZXJlbGVhc2U6IHByZXJlbCxcbiAgICAgIGJ1aWxkOiBwcmVidWlsZCxcbiAgICAgIGdpdGhhc2g6IHBhY2suZ2l0aGFzaCA/IHBhY2suZ2l0aGFzaCA6IFwiXCIsXG4gICAgICB2ZXJzaW9uczogcGFjay52ZXJzaW9ucyxcbiAgICB9O1xuICAgIHJldHVybiB2ZXJzaW9uO1xuICB9XG5cbn1cbiJdfQ==