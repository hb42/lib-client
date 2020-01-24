/**
 * Auf SSE Events reagieren
 */
export declare class SseHandler {
    private sse;
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param serverUrl - Server-Adresse
     * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    constructor(serverUrl: string, sseAddr: string);
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
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}
