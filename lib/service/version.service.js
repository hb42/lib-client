var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Location } from "@angular/common";
// import { major, minor, patch, prerelease} from "semver";
import * as semver from "semver";
import { HttpClient, } from "@angular/common/http";
import { Injectable, VERSION, } from "@angular/core";
import { ElectronService, } from "./";
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
        // ['alpha', 10] || [10]
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
