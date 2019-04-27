import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ElectronService } from "./electron.service";
import { Version } from "./version";
export declare class VersionService {
    private http;
    private electronService;
    private location;
    private version;
    private serverversion;
    constructor(http: HttpClient, electronService: ElectronService, location: Location);
    readonly ver: Version;
    readonly serverVer: Version;
    /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     */
    init(serverPackage: string): Promise<Version>;
    private makeVer;
}
