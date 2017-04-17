import { BrowserXhr, Request, ResponseOptions, XHRBackend, XHRConnection, XSRFStrategy } from "@angular/http";
import "rxjs/add/operator/catch";
export declare class XHRBackendHandler extends XHRBackend {
    private browserXhr;
    private baseResponseOptions;
    private xsrfStrategy;
    constructor(browserXhr: BrowserXhr, baseResponseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy);
    createConnection(request: Request): XHRConnection;
}
