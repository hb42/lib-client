/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { makeSseUrl } from "@hb42/lib-common";
/**
 * Auf SSE Events reagieren
 */
var /**
 * Auf SSE Events reagieren
 */
SseHandler = /** @class */ (function () {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param serverUrl - Server-Adresse
     * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    function SseHandler(serverUrl, sseAddr) {
        var _this = this;
        /** @type {?} */
        var sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.debug("SSE open readystate=" + _this.sse.readyState);
        });
        this.addEventListener("init", (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.debug("SSE received initialization message");
        }));
        this.sse.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
     * @param type - Name des Event
     * @param listener - Listener-Funktion -> (event) => {}
     */
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
    SseHandler.prototype.addEventListener = /**
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
    function (type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    };
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    SseHandler.prototype.removeEventListener = /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    function (type, listener) {
        this.sse.removeEventListener(type, listener);
    };
    return SseHandler;
}());
/**
 * Auf SSE Events reagieren
 */
export { SseHandler };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SseHandler.prototype.sse;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NlLmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9zc2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBSzlDOzs7O0lBSUU7Ozs7O09BS0c7SUFDSCxvQkFBWSxTQUFpQixFQUFFLE9BQWU7UUFBOUMsaUJBY0M7O1lBYk8sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNOzs7O1FBQUcsVUFBQyxLQUFtQjtZQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFBLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTTs7OztRQUFFLFVBQUMsS0FBbUI7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPOzs7O1FBQUcsVUFBQyxLQUFtQjtZQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7Ozs7Ozs7Ozs7OztJQUNJLHFDQUFnQjs7Ozs7Ozs7Ozs7SUFBdkIsVUFBd0IsSUFBWSxFQUFFLFFBQTRDO1FBQ2hGLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBRU0sd0NBQW1COzs7OztJQUExQixVQUEyQixJQUFZLEVBQUUsUUFBNEM7UUFDbkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVILGlCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQzs7Ozs7Ozs7OztJQTNDQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWtlU3NlVXJsIH0gZnJvbSBcIkBoYjQyL2xpYi1jb21tb25cIjtcclxuXHJcbi8qKlxyXG4gKiBBdWYgU1NFIEV2ZW50cyByZWFnaWVyZW5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTc2VIYW5kbGVyIHtcclxuXHJcbiAgcHJpdmF0ZSBzc2U6IEV2ZW50U291cmNlO1xyXG5cclxuICAvKipcclxuICAgKiBFdmVudFNvdXJjZSBmdWVyIGRlbiBFbXBmYW5nIHZvbiBTZXJ2ZXIgU2VudCBFdmVudHMgZXJ6ZXVnZW5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZXJ2ZXJVcmwgLSBTZXJ2ZXItQWRyZXNzZVxyXG4gICAqIEBwYXJhbSBzc2VBZGRyIC0gU1NFLUF1ZnJ1ZiAod2lyZCBpbnRlcm4gYXVmIC9zc2UvPHNzZUFkZHI+IHVtZ2VzZXR6dClcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzZXJ2ZXJVcmw6IHN0cmluZywgc3NlQWRkcjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzc2VVcmwgPSBtYWtlU3NlVXJsKFwiZmFyY1wiKTtcclxuICAgIHRoaXMuc3NlID0gbmV3IEV2ZW50U291cmNlKHNlcnZlclVybCArIHNzZVVybCwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSk7XHJcblxyXG4gICAgdGhpcy5zc2Uub25vcGVuID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5kZWJ1ZyhcIlNTRSBvcGVuIHJlYWR5c3RhdGU9XCIgKyB0aGlzLnNzZS5yZWFkeVN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJpbml0XCIsIChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJTU0UgcmVjZWl2ZWQgaW5pdGlhbGl6YXRpb24gbWVzc2FnZVwiKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zc2Uub25lcnJvciA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFdmVudFNvdXJjZSBmYWlsZWQuIFwiKTtcclxuICAgICAgY29uc29sZS5kaXIoZXZlbnQpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbmVyIGZ1ZXIgU1NFIEV2ZW50cyBhbmhhZW5nZW5cclxuICAgKlxyXG4gICAqICAgZXZlbnQubGFzdEV2ZW50SWQgLT4gaWRcclxuICAgKiAgIGV2ZW50LnR5cGUgLT4gZXZlbnRcclxuICAgKiAgIGV2ZW50LmRhdGEgLT4gZGF0YVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHR5cGUgLSBOYW1lIGRlcyBFdmVudFxyXG4gICAqIEBwYXJhbSBsaXN0ZW5lciAtIExpc3RlbmVyLUZ1bmt0aW9uIC0+IChldmVudCkgPT4ge31cclxuICAgKi9cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKFwiU1NFIGFkZEV2ZW50TGlzdGVuZXIgXCIgKyB0eXBlKTtcclxuICAgIHRoaXMuc3NlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCkge1xyXG4gICAgdGhpcy5zc2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=