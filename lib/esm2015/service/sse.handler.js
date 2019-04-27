/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { makeSseUrl } from "@hb42/lib-common";
/**
 * Auf SSE Events reagieren
 */
export class SseHandler {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param {?} serverUrl - Server-Adresse
     * @param {?} sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    constructor(serverUrl, sseAddr) {
        /** @type {?} */
        const sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.debug("SSE open readystate=" + this.sse.readyState);
        });
        this.addEventListener("init", (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.debug("SSE received initialization message");
        }));
        this.sse.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.error("EventSource failed. ");
            console.dir(event);
        });
    }
    /**
     * Listener fuer SSE Events anhaengen
     *
     *   event.lastEventId -> id
     *   event.type -> event
     *   event.data -> data
     *
     * @param {?} type - Name des Event
     * @param {?} listener - Listener-Funktion -> (event) => {}
     * @return {?}
     */
    addEventListener(type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    }
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    removeEventListener(type, listener) {
        this.sse.removeEventListener(type, listener);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SseHandler.prototype.sse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NlLmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9zc2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBSzlDLE1BQU0sT0FBTyxVQUFVOzs7Ozs7O0lBVXJCLFlBQVksU0FBaUIsRUFBRSxPQUFlOztjQUN0QyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFNLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUxRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07Ozs7UUFBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTTs7OztRQUFFLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTzs7OztRQUFHLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQSxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7Ozs7O0lBWU0sZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQTRDO1FBQ2hGLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBRU0sbUJBQW1CLENBQUMsSUFBWSxFQUFFLFFBQTRDO1FBQ25GLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FFRjs7Ozs7O0lBM0NDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1ha2VTc2VVcmwgfSBmcm9tIFwiQGhiNDIvbGliLWNvbW1vblwiO1xyXG5cclxuLyoqXHJcbiAqIEF1ZiBTU0UgRXZlbnRzIHJlYWdpZXJlblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNzZUhhbmRsZXIge1xyXG5cclxuICBwcml2YXRlIHNzZTogRXZlbnRTb3VyY2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50U291cmNlIGZ1ZXIgZGVuIEVtcGZhbmcgdm9uIFNlcnZlciBTZW50IEV2ZW50cyBlcnpldWdlblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlcnZlclVybCAtIFNlcnZlci1BZHJlc3NlXHJcbiAgICogQHBhcmFtIHNzZUFkZHIgLSBTU0UtQXVmcnVmICh3aXJkIGludGVybiBhdWYgL3NzZS88c3NlQWRkcj4gdW1nZXNldHp0KVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNlcnZlclVybDogc3RyaW5nLCBzc2VBZGRyOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHNzZVVybCA9IG1ha2VTc2VVcmwoXCJmYXJjXCIpO1xyXG4gICAgdGhpcy5zc2UgPSBuZXcgRXZlbnRTb3VyY2Uoc2VydmVyVXJsICsgc3NlVXJsLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcclxuXHJcbiAgICB0aGlzLnNzZS5vbm9wZW4gPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKFwiU1NFIG9wZW4gcmVhZHlzdGF0ZT1cIiArIHRoaXMuc3NlLnJlYWR5U3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImluaXRcIiwgKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5kZWJ1ZyhcIlNTRSByZWNlaXZlZCBpbml0aWFsaXphdGlvbiBtZXNzYWdlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNzZS5vbmVycm9yID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkV2ZW50U291cmNlIGZhaWxlZC4gXCIpO1xyXG4gICAgICBjb25zb2xlLmRpcihldmVudCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgZnVlciBTU0UgRXZlbnRzIGFuaGFlbmdlblxyXG4gICAqXHJcbiAgICogICBldmVudC5sYXN0RXZlbnRJZCAtPiBpZFxyXG4gICAqICAgZXZlbnQudHlwZSAtPiBldmVudFxyXG4gICAqICAgZXZlbnQuZGF0YSAtPiBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIE5hbWUgZGVzIEV2ZW50XHJcbiAgICogQHBhcmFtIGxpc3RlbmVyIC0gTGlzdGVuZXItRnVua3Rpb24gLT4gKGV2ZW50KSA9PiB7fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJTU0UgYWRkRXZlbnRMaXN0ZW5lciBcIiArIHR5cGUpO1xyXG4gICAgdGhpcy5zc2UuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSB7XHJcbiAgICB0aGlzLnNzZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==