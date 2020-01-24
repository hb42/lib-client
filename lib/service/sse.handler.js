/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
