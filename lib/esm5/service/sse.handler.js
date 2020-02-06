import { makeSseUrl } from "@hb42/lib-common";
/**
 * Auf SSE Events reagieren
 */
var SseHandler = /** @class */ (function () {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param serverUrl - Server-Adresse
     * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    function SseHandler(serverUrl, sseAddr) {
        var _this = this;
        var sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = function (event) {
            console.debug("SSE open readystate=" + _this.sse.readyState);
        };
        this.addEventListener("init", function (event) {
            console.debug("SSE received initialization message");
        });
        this.sse.onerror = function (event) {
            console.error("EventSource failed. ");
            console.dir(event);
        };
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
    SseHandler.prototype.addEventListener = function (type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    };
    SseHandler.prototype.removeEventListener = function (type, listener) {
        this.sse.removeEventListener(type, listener);
    };
    return SseHandler;
}());
export { SseHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NlLmhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9zc2UuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUM7O0dBRUc7QUFDSDtJQUlFOzs7OztPQUtHO0lBQ0gsb0JBQVksU0FBaUIsRUFBRSxPQUFlO1FBQTlDLGlCQWNDO1FBYkMsSUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxHQUFHLE1BQU0sRUFBRSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQUMsS0FBbUI7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFtQjtZQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQW1CO1lBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxxQ0FBZ0IsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLFFBQTRDO1FBQ2hGLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHdDQUFtQixHQUExQixVQUEyQixJQUFZLEVBQUUsUUFBNEM7UUFDbkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVILGlCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1ha2VTc2VVcmwgfSBmcm9tIFwiQGhiNDIvbGliLWNvbW1vblwiO1xyXG5cclxuLyoqXHJcbiAqIEF1ZiBTU0UgRXZlbnRzIHJlYWdpZXJlblxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNzZUhhbmRsZXIge1xyXG5cclxuICBwcml2YXRlIHNzZTogRXZlbnRTb3VyY2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50U291cmNlIGZ1ZXIgZGVuIEVtcGZhbmcgdm9uIFNlcnZlciBTZW50IEV2ZW50cyBlcnpldWdlblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlcnZlclVybCAtIFNlcnZlci1BZHJlc3NlXHJcbiAgICogQHBhcmFtIHNzZUFkZHIgLSBTU0UtQXVmcnVmICh3aXJkIGludGVybiBhdWYgL3NzZS88c3NlQWRkcj4gdW1nZXNldHp0KVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNlcnZlclVybDogc3RyaW5nLCBzc2VBZGRyOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHNzZVVybCA9IG1ha2VTc2VVcmwoXCJmYXJjXCIpO1xyXG4gICAgdGhpcy5zc2UgPSBuZXcgRXZlbnRTb3VyY2Uoc2VydmVyVXJsICsgc3NlVXJsLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcclxuXHJcbiAgICB0aGlzLnNzZS5vbm9wZW4gPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKFwiU1NFIG9wZW4gcmVhZHlzdGF0ZT1cIiArIHRoaXMuc3NlLnJlYWR5U3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImluaXRcIiwgKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5kZWJ1ZyhcIlNTRSByZWNlaXZlZCBpbml0aWFsaXphdGlvbiBtZXNzYWdlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNzZS5vbmVycm9yID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkV2ZW50U291cmNlIGZhaWxlZC4gXCIpO1xyXG4gICAgICBjb25zb2xlLmRpcihldmVudCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuZXIgZnVlciBTU0UgRXZlbnRzIGFuaGFlbmdlblxyXG4gICAqXHJcbiAgICogICBldmVudC5sYXN0RXZlbnRJZCAtPiBpZFxyXG4gICAqICAgZXZlbnQudHlwZSAtPiBldmVudFxyXG4gICAqICAgZXZlbnQuZGF0YSAtPiBkYXRhXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIE5hbWUgZGVzIEV2ZW50XHJcbiAgICogQHBhcmFtIGxpc3RlbmVyIC0gTGlzdGVuZXItRnVua3Rpb24gLT4gKGV2ZW50KSA9PiB7fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJTU0UgYWRkRXZlbnRMaXN0ZW5lciBcIiArIHR5cGUpO1xyXG4gICAgdGhpcy5zc2UuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KSB7XHJcbiAgICB0aGlzLnNzZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==