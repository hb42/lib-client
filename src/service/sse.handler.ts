import { makeSseUrl } from "@hb42/lib-common";

/**
 * Auf SSE Events reagieren
 */
export class SseHandler {

  private sse: EventSource;

  /**
   * EventSource fuer den Empfang von Server Sent Events erzeugen
   *
   * @param serverUrl - Server-Adresse
   * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
   */
  constructor(serverUrl: string, sseAddr: string) {
    const sseUrl = makeSseUrl("farc");
    this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });

    this.sse.onopen = (event: MessageEvent) => {
      console.debug("SSE open readystate=" + this.sse.readyState);
    };
    this.addEventListener("init", (event: MessageEvent) => {
      console.debug("SSE received initialization message");
    });
    this.sse.onerror = (event: MessageEvent) => {
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
  public addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    console.debug("SSE addEventListener " + type);
    this.sse.addEventListener(type, listener);
  }

  public removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.sse.removeEventListener(type, listener);
  }

}
