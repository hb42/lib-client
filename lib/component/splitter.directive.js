/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { Directive, ElementRef, Input, } from "@angular/core";
export class FlexboxSplitter {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        // inputs
        this.storageId = "";
        this.lastPos = 0;
        console.debug("c'tor flexboxsplitter");
        this.splitter = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Umgebung holen
        this.prevEl = (/** @type {?} */ (this.splitter.previousElementSibling));
        this.nextEl = (/** @type {?} */ (this.splitter.nextElementSibling));
        /** @type {?} */
        const parent = (/** @type {?} */ (this.splitter.parentElement));
        // parent muss flexbox sein
        // if (this.getProp(parent, "display") !== "flex") {
        //   throw "Error: parent element for splitter must have style display:flex.";
        // }
        // Richtung festlegen und passende Styles fuer den Splitter
        if (this.getProp(parent, "flexDirection") === "row") {
            this.dimension = "width";
            this.splitter.style[(/** @type {?} */ ("border-left"))] = "1px solid gray";
            this.splitter.style["cursor"] = "col-resize";
        }
        else {
            this.dimension = "height";
            this.splitter.style[(/** @type {?} */ ("border-top"))] = "1px solid gray";
            this.splitter.style["cursor"] = "row-resize";
        }
        this.splitter.style["background"] = "#eee";
        this.splitter.style[(/** @type {?} */ (this.dimension))] = "6px";
        // Elemente nur fuer fixe Groesse aendern, flexGrow >0 = auto
        // this.chgPrev = this.getProp(this.prevEl, "flexGrow") === 0;
        // this.chgNext = this.getProp(this.nextEl, "flexGrow") === 0;
        // los geht"s
        this.initSplitter();
    }
    /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    getProp(elem, prop) {
        // window.getComputedStyle(elem).getPropertyValue(prop);
        // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
        return window.getComputedStyle(elem)[(/** @type {?} */ (prop))];
    }
    /**
     * @private
     * @return {?}
     */
    initSplitter() {
        // let self: FlexboxSplitter = this;
        // let self: FlexboxSplitter = this;
        // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
        /** @type {?} */
        const params = { bubbles: false, cancelable: false, detail: undefined };
        this.splitterEvent = document.createEvent("CustomEvent");
        this.splitterEvent
            .initCustomEvent(FlexboxSplitter.SPLITTER_EVENT, params.bubbles, params.cancelable, params.detail);
        /** @type {?} */
        const drag = (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
        });
        /** @type {?} */
        const calcSize = (/**
         * @param {?} pos
         * @return {?}
         */
        (pos) => {
            /** @type {?} */
            let newsize;
            /** @type {?} */
            const diff = pos - this.lastPos;
            // if (self.chgPrev) {
            newsize = parseInt(this.getProp(this.prevEl, this.dimension), 10) + diff;
            this.prevEl.style[(/** @type {?} */ (this.dimension))] = newsize + "px";
            // }
            // if (self.chgNext) {
            newsize = parseInt(this.getProp(this.nextEl, this.dimension), 10) - diff;
            this.nextEl.style[(/** @type {?} */ (this.dimension))] = newsize + "px";
            // }
            this.lastPos = pos;
        });
        /** @type {?} */
        const endDrag = (/**
         * @return {?}
         */
        () => {
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
        });
        this.splitter.addEventListener("mousedown", (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            evt.preventDefault(); // prevent text selection
            this.lastPos = this.dimension === "width" ? evt.clientX : evt.clientY;
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
        }));
        // default pos setzen, oder ggf. letzten Stand holen
        this.lastPos = this.dimension === "width" ? this.splitter.getBoundingClientRect().left
            : this.splitter.getBoundingClientRect().top;
        if (this.storageId) {
            /** @type {?} */
            const state = localStorage.getItem(this.storageId);
            /** @type {?} */
            const laststate = parseInt(state ? state : "0", 10);
            if (laststate) {
                calcSize(laststate);
            }
        }
    }
}
FlexboxSplitter.SPLITTER_EVENT = "hbsplitter";
FlexboxSplitter.decorators = [
    { type: Directive, args: [{
                selector: "[fb-splitter]",
            },] }
];
/** @nocollapse */
FlexboxSplitter.ctorParameters = () => [
    { type: ElementRef }
];
FlexboxSplitter.propDecorators = {
    storageId: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    FlexboxSplitter.SPLITTER_EVENT;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.storageId;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.splitter;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.prevEl;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.nextEl;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.dimension;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.splitterEvent;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.lastPos;
    /**
     * @type {?}
     * @private
     */
    FlexboxSplitter.prototype.el;
}
