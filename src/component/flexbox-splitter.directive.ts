/**
 * Attribut fb-splitter
 *
 * Splitter fuer Flexbox
 *
 * Die Voraussetzung ist, dass das Parent-Element mit display:flex ausgezeichnet ist.
 * Die Splitterausrichtung wird von der flexDirection-Eigenschaft des Parent abgeleitet
 * ("row" horizontaler Splitter, "column" vertikal).
 * Der Splitter muss zwischen den beiden Element plaziert werden, die veraendert werden
 * sollen, "order" funktioniert hier nicht. Mindestens eines der Elemente muss eine feste
 * Breite/Hoehe haben (flexGrow:0, bzw flex:0 0 auto + width:/height: XXpx). Sinnvoll
 * ist zudem min-width bzw. min-height. Das zweite Element kann flex:1 bzw. flex:auto
 * bekommen, dann kuemmert sich Flexbox ums Anpassen.
 *
 * Das parent-Element braucht ausserdem den Style "align-items: stretch" (ist default).
 * Damit overflow im inneren DIV funktioniert muessen die Flexbox-Items position:relative
 * und der innere DIV position:absolute bekommen.
 *
 * inputs: [storageId]  - Kennung fuer die Splitterposition in der localStorage
 *                        (leer -> nicht speichern)
 *
 * Quelle:
 * https://hacks.mozilla.org/2013/12/application-layout-with-css3-flexible-box-module/
 */

import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[fb-splitter]",
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FlexboxSplitter implements OnInit {
  public static SPLITTER_EVENT = "hbsplitter";

  // inputs
  @Input() private storageId = "";

  private splitter: HTMLElement;
  private prevEl: HTMLElement;
  private nextEl: HTMLElement;
  private dimension: string;
  // private chgPrev: boolean = false;
  // private chgNext: boolean = false;

  private splitterEvent: CustomEvent;

  private lastPos = 0;

  constructor(private el: ElementRef) {
    console.debug("c'tor flexboxsplitter");
    this.splitter = el.nativeElement;
  }

  public ngOnInit() {
    // Umgebung holen
    this.prevEl = this.splitter.previousElementSibling as HTMLElement;
    this.nextEl = this.splitter.nextElementSibling as HTMLElement;
    const parent: Element = this.splitter.parentElement as Element;
    // parent muss flexbox sein
    // if (this.getProp(parent, "display") !== "flex") {
    //   throw "Error: parent element for splitter must have style display:flex.";
    // }
    // Richtung festlegen und passende Styles fuer den Splitter
    if (this.getProp(parent, "flexDirection") === "row") {
      this.dimension = "width";
      this.splitter.style["border-left" as any] = "1px solid gray";
      this.splitter.style["cursor"] = "col-resize";
    } else {
      this.dimension = "height";
      this.splitter.style["border-top" as any] = "1px solid gray";
      this.splitter.style["cursor"] = "row-resize";
    }
    this.splitter.style["background"] = "#eee";
    this.splitter.style[this.dimension as any] = "6px";

    // Elemente nur fuer fixe Groesse aendern, flexGrow >0 = auto
    // this.chgPrev = this.getProp(this.prevEl, "flexGrow") === 0;
    // this.chgNext = this.getProp(this.nextEl, "flexGrow") === 0;
    // los geht"s
    this.initSplitter();
  }

  private getProp(elem: Element, prop: string): any {
    // window.getComputedStyle(elem).getPropertyValue(prop);
    // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
    return window.getComputedStyle(elem)[prop as any];
  }

  private initSplitter() {
    // let self: FlexboxSplitter = this;

    // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
    const params: any = { bubbles: false, cancelable: false, detail: undefined };
    this.splitterEvent = document.createEvent("CustomEvent");
    this.splitterEvent.initCustomEvent(
      FlexboxSplitter.SPLITTER_EVENT,
      params.bubbles,
      params.cancelable,
      params.detail
    );

    const drag = (evt: DragEvent) => {
      this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
    };

    const calcSize = (pos: number) => {
      let newsize: number;
      const diff: number = pos - this.lastPos;
      // if (self.chgPrev) {
      newsize = parseInt(this.getProp(this.prevEl, this.dimension), 10) + diff;
      this.prevEl.style[this.dimension as any] = newsize + "px";
      // }
      // if (self.chgNext) {
      newsize = parseInt(this.getProp(this.nextEl, this.dimension), 10) - diff;
      this.nextEl.style[this.dimension as any] = newsize + "px";
      // }
      this.lastPos = pos;
    };
    const endDrag = () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", endDrag);

      // element bekommt list of listener als callbacks bei Aend
      // foreach listener listener()
      // -> Bsp eventService

      // fkt. nicht
      // var evt = document.createEvent("UIEvent");
      // evt.initUIEvent("resize", true, false,window,0);
      // window.dispatchEvent(evt);

      window.dispatchEvent(this.splitterEvent);

      // import f. jquery??
      // $(window).resize();

      if (this.storageId) {
        localStorage.setItem(this.storageId, this.lastPos.toString(10));
      }
    };

    this.splitter.addEventListener("mousedown", (evt: DragEvent) => {
      evt.preventDefault(); // prevent text selection
      this.lastPos = this.dimension === "width" ? evt.clientX : evt.clientY;
      window.addEventListener("mousemove", drag);
      window.addEventListener("mouseup", endDrag);
    });

    // default pos setzen, oder ggf. letzten Stand holen
    this.lastPos =
      this.dimension === "width"
        ? this.splitter.getBoundingClientRect().left
        : this.splitter.getBoundingClientRect().top;
    if (this.storageId) {
      const state = localStorage.getItem(this.storageId);
      const laststate = parseInt(state ? state : "0", 10);
      if (laststate) {
        calcSize(laststate);
      }
    }
  }
}
