/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudC9zcGxpdHRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEdBRVIsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLGVBQWU7Ozs7SUFrQjFCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZOztRQWJqQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBV2hDLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFHMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQWUsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQWUsQ0FBQzs7Y0FDeEQsTUFBTSxHQUFZLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFXO1FBQzlELDJCQUEyQjtRQUMzQixvREFBb0Q7UUFDcEQsOEVBQThFO1FBQzlFLElBQUk7UUFDSiwyREFBMkQ7UUFDM0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQUEsYUFBYSxFQUFPLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztZQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxZQUFZLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFBLFlBQVksRUFBTyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7WUFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFBLElBQUksQ0FBQyxTQUFTLEVBQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVuRCw2REFBNkQ7UUFDN0QsOERBQThEO1FBQzlELDhEQUE4RDtRQUM5RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7Ozs7SUFFTyxPQUFPLENBQUMsSUFBYSxFQUFFLElBQVk7UUFDekMsd0RBQXdEO1FBQ3hELDRFQUE0RTtRQUM1RSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixvQ0FBb0M7Ozs7Y0FHOUIsTUFBTSxHQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7UUFDNUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhO2FBQ2IsZUFBZSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Y0FFakcsSUFBSTs7OztRQUFHLENBQUMsR0FBYyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUFBOztjQUVLLFFBQVE7Ozs7UUFBRyxDQUFDLEdBQVcsRUFBRSxFQUFFOztnQkFDM0IsT0FBZTs7a0JBQ2IsSUFBSSxHQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTztZQUN2QyxzQkFBc0I7WUFDdEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxFQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUk7WUFDSixzQkFBc0I7WUFDdEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBQSxJQUFJLENBQUMsU0FBUyxFQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzFELElBQUk7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNyQixDQUFDLENBQUE7O2NBQ0ssT0FBTzs7O1FBQUcsR0FBRyxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUvQywwREFBMEQ7WUFDMUQsOEJBQThCO1lBQzlCLHNCQUFzQjtZQUV0QixhQUFhO1lBQ2IsNkNBQTZDO1lBQzdDLG1EQUFtRDtZQUNuRCw2QkFBNkI7WUFFN0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFekMscUJBQXFCO1lBQ3JCLHNCQUFzQjtZQUV0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXOzs7O1FBQUUsQ0FBQyxHQUFjLEVBQUUsRUFBRTtZQUM3RCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBSSx5QkFBeUI7WUFDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUN0RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7UUFFSCxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUk7WUFDbEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOztrQkFDWixLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOztrQkFDNUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNuRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckI7U0FDRjtJQUNILENBQUM7O0FBMUhhLDhCQUFjLEdBQVcsWUFBWSxDQUFDOztZQUxyRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFQRyxVQUFVOzs7d0JBYVgsS0FBSzs7OztJQUhOLCtCQUFvRDs7Ozs7SUFHcEQsb0NBQXdDOzs7OztJQUV4QyxtQ0FBOEI7Ozs7O0lBQzlCLGlDQUE0Qjs7Ozs7SUFDNUIsaUNBQTRCOzs7OztJQUM1QixvQ0FBMEI7Ozs7O0lBSTFCLHdDQUFtQzs7Ozs7SUFFbkMsa0NBQTRCOzs7OztJQUVoQiw2QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEF0dHJpYnV0IGZiLXNwbGl0dGVyXG4gKlxuICogU3BsaXR0ZXIgZnVlciBGbGV4Ym94XG4gKlxuICogRGllIFZvcmF1c3NldHp1bmcgaXN0LCBkYXNzIGRhcyBQYXJlbnQtRWxlbWVudCBtaXQgZGlzcGxheTpmbGV4IGF1c2dlemVpY2huZXQgaXN0LlxuICogRGllIFNwbGl0dGVyYXVzcmljaHR1bmcgd2lyZCB2b24gZGVyIGZsZXhEaXJlY3Rpb24tRWlnZW5zY2hhZnQgZGVzIFBhcmVudCBhYmdlbGVpdGV0XG4gKiAoXCJyb3dcIiBob3Jpem9udGFsZXIgU3BsaXR0ZXIsIFwiY29sdW1uXCIgdmVydGlrYWwpLlxuICogRGVyIFNwbGl0dGVyIG11c3Mgendpc2NoZW4gZGVuIGJlaWRlbiBFbGVtZW50IHBsYXppZXJ0IHdlcmRlbiwgZGllIHZlcmFlbmRlcnQgd2VyZGVuXG4gKiBzb2xsZW4sIFwib3JkZXJcIiBmdW5rdGlvbmllcnQgaGllciBuaWNodC4gTWluZGVzdGVucyBlaW5lcyBkZXIgRWxlbWVudGUgbXVzcyBlaW5lIGZlc3RlXG4gKiBCcmVpdGUvSG9laGUgaGFiZW4gKGZsZXhHcm93OjAsIGJ6dyBmbGV4OjAgMCBhdXRvICsgd2lkdGg6L2hlaWdodDogWFhweCkuIFNpbm52b2xsXG4gKiBpc3QgenVkZW0gbWluLXdpZHRoIGJ6dy4gbWluLWhlaWdodC4gRGFzIHp3ZWl0ZSBFbGVtZW50IGthbm4gZmxleDoxIGJ6dy4gZmxleDphdXRvXG4gKiBiZWtvbW1lbiwgZGFubiBrdWVtbWVydCBzaWNoIEZsZXhib3ggdW1zIEFucGFzc2VuLlxuICpcbiAqIERhcyBwYXJlbnQtRWxlbWVudCBicmF1Y2h0IGF1c3NlcmRlbSBkZW4gU3R5bGUgXCJhbGlnbi1pdGVtczogc3RyZXRjaFwiIChpc3QgZGVmYXVsdCkuXG4gKiBEYW1pdCBvdmVyZmxvdyBpbSBpbm5lcmVuIERJViBmdW5rdGlvbmllcnQgbXVlc3NlbiBkaWUgRmxleGJveC1JdGVtcyBwb3NpdGlvbjpyZWxhdGl2ZVxuICogdW5kIGRlciBpbm5lcmUgRElWIHBvc2l0aW9uOmFic29sdXRlIGJla29tbWVuLlxuICpcbiAqIGlucHV0czogW3N0b3JhZ2VJZF0gIC0gS2VubnVuZyBmdWVyIGRpZSBTcGxpdHRlcnBvc2l0aW9uIGluIGRlciBsb2NhbFN0b3JhZ2VcbiAqICAgICAgICAgICAgICAgICAgICAgICAgKGxlZXIgLT4gbmljaHQgc3BlaWNoZXJuKVxuICpcbiAqIFF1ZWxsZTpcbiAqIGh0dHBzOi8vaGFja3MubW96aWxsYS5vcmcvMjAxMy8xMi9hcHBsaWNhdGlvbi1sYXlvdXQtd2l0aC1jc3MzLWZsZXhpYmxlLWJveC1tb2R1bGUvXG4gKi9cblxuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJbZmItc3BsaXR0ZXJdXCIsXG59KVxuZXhwb3J0IGNsYXNzIEZsZXhib3hTcGxpdHRlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIHN0YXRpYyBTUExJVFRFUl9FVkVOVDogc3RyaW5nID0gXCJoYnNwbGl0dGVyXCI7XG5cbiAgLy8gaW5wdXRzXG4gIEBJbnB1dCgpIHByaXZhdGUgc3RvcmFnZUlkOiBzdHJpbmcgPSBcIlwiO1xuXG4gIHByaXZhdGUgc3BsaXR0ZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHByZXZFbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgbmV4dEVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBkaW1lbnNpb246IHN0cmluZztcbiAgLy8gcHJpdmF0ZSBjaGdQcmV2OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIHByaXZhdGUgY2hnTmV4dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3BsaXR0ZXJFdmVudDogQ3VzdG9tRXZlbnQ7XG5cbiAgcHJpdmF0ZSBsYXN0UG9zOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiYyd0b3IgZmxleGJveHNwbGl0dGVyXCIpO1xuICAgIHRoaXMuc3BsaXR0ZXIgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIC8vIFVtZ2VidW5nIGhvbGVuXG4gICAgdGhpcy5wcmV2RWwgPSB0aGlzLnNwbGl0dGVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5uZXh0RWwgPSB0aGlzLnNwbGl0dGVyLm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBwYXJlbnQ6IEVsZW1lbnQgPSB0aGlzLnNwbGl0dGVyLnBhcmVudEVsZW1lbnQgYXMgRWxlbWVudDtcbiAgICAvLyBwYXJlbnQgbXVzcyBmbGV4Ym94IHNlaW5cbiAgICAvLyBpZiAodGhpcy5nZXRQcm9wKHBhcmVudCwgXCJkaXNwbGF5XCIpICE9PSBcImZsZXhcIikge1xuICAgIC8vICAgdGhyb3cgXCJFcnJvcjogcGFyZW50IGVsZW1lbnQgZm9yIHNwbGl0dGVyIG11c3QgaGF2ZSBzdHlsZSBkaXNwbGF5OmZsZXguXCI7XG4gICAgLy8gfVxuICAgIC8vIFJpY2h0dW5nIGZlc3RsZWdlbiB1bmQgcGFzc2VuZGUgU3R5bGVzIGZ1ZXIgZGVuIFNwbGl0dGVyXG4gICAgaWYgKHRoaXMuZ2V0UHJvcChwYXJlbnQsIFwiZmxleERpcmVjdGlvblwiKSA9PT0gXCJyb3dcIikge1xuICAgICAgdGhpcy5kaW1lbnNpb24gPSBcIndpZHRoXCI7XG4gICAgICB0aGlzLnNwbGl0dGVyLnN0eWxlW1wiYm9yZGVyLWxlZnRcIiBhcyBhbnldID0gXCIxcHggc29saWQgZ3JheVwiO1xuICAgICAgdGhpcy5zcGxpdHRlci5zdHlsZVtcImN1cnNvclwiXSA9IFwiY29sLXJlc2l6ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpbWVuc2lvbiA9IFwiaGVpZ2h0XCI7XG4gICAgICB0aGlzLnNwbGl0dGVyLnN0eWxlW1wiYm9yZGVyLXRvcFwiIGFzIGFueV0gPSBcIjFweCBzb2xpZCBncmF5XCI7XG4gICAgICB0aGlzLnNwbGl0dGVyLnN0eWxlW1wiY3Vyc29yXCJdID0gXCJyb3ctcmVzaXplXCI7XG4gICAgfVxuICAgIHRoaXMuc3BsaXR0ZXIuc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCIjZWVlXCI7XG4gICAgdGhpcy5zcGxpdHRlci5zdHlsZVt0aGlzLmRpbWVuc2lvbiBhcyBhbnldID0gXCI2cHhcIjtcblxuICAgIC8vIEVsZW1lbnRlIG51ciBmdWVyIGZpeGUgR3JvZXNzZSBhZW5kZXJuLCBmbGV4R3JvdyA+MCA9IGF1dG9cbiAgICAvLyB0aGlzLmNoZ1ByZXYgPSB0aGlzLmdldFByb3AodGhpcy5wcmV2RWwsIFwiZmxleEdyb3dcIikgPT09IDA7XG4gICAgLy8gdGhpcy5jaGdOZXh0ID0gdGhpcy5nZXRQcm9wKHRoaXMubmV4dEVsLCBcImZsZXhHcm93XCIpID09PSAwO1xuICAgIC8vIGxvcyBnZWh0XCJzXG4gICAgdGhpcy5pbml0U3BsaXR0ZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvcChlbGVtOiBFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XG4gICAgLy8gaW0gKklFKiBma3QuIGdldFByb3BlcnR5VmFsdWUoKSBuaWNodCwgYWx0LiBkaXJla3RlciBadWdyaWZmIG1pdCBbXCJwcm9wXCJdXG4gICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pW3Byb3AgYXMgYW55XTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFNwbGl0dGVyKCkge1xuICAgIC8vIGxldCBzZWxmOiBGbGV4Ym94U3BsaXR0ZXIgPSB0aGlzO1xuXG4gICAgLy8gdmFyIGV2ZW50ID0gbmV3IEV2ZW50KFwiaGIuc3BsaXR0ZXJcIik7IGZrdC4gbGVpZGVyIG5pY2h0IGltICpJRSosIHN0YXR0IGRlc3NlbjpcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZCB9O1xuICAgIHRoaXMuc3BsaXR0ZXJFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgdGhpcy5zcGxpdHRlckV2ZW50XG4gICAgICAgIC5pbml0Q3VzdG9tRXZlbnQoRmxleGJveFNwbGl0dGVyLlNQTElUVEVSX0VWRU5ULCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuXG4gICAgY29uc3QgZHJhZyA9IChldnQ6IERyYWdFdmVudCkgPT4ge1xuICAgICAgdGhpcy5kaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IGNhbGNTaXplKGV2dC5jbGllbnRYKSA6IGNhbGNTaXplKGV2dC5jbGllbnRZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FsY1NpemUgPSAocG9zOiBudW1iZXIpID0+IHtcbiAgICAgIGxldCBuZXdzaXplOiBudW1iZXI7XG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBwb3MgLSB0aGlzLmxhc3RQb3M7XG4gICAgICAvLyBpZiAoc2VsZi5jaGdQcmV2KSB7XG4gICAgICBuZXdzaXplID0gcGFyc2VJbnQodGhpcy5nZXRQcm9wKHRoaXMucHJldkVsLCB0aGlzLmRpbWVuc2lvbiksIDEwKSArIGRpZmY7XG4gICAgICB0aGlzLnByZXZFbC5zdHlsZVt0aGlzLmRpbWVuc2lvbiBhcyBhbnldID0gbmV3c2l6ZSArIFwicHhcIjtcbiAgICAgIC8vIH1cbiAgICAgIC8vIGlmIChzZWxmLmNoZ05leHQpIHtcbiAgICAgIG5ld3NpemUgPSBwYXJzZUludCh0aGlzLmdldFByb3AodGhpcy5uZXh0RWwsIHRoaXMuZGltZW5zaW9uKSwgMTApIC0gZGlmZjtcbiAgICAgIHRoaXMubmV4dEVsLnN0eWxlW3RoaXMuZGltZW5zaW9uIGFzIGFueV0gPSBuZXdzaXplICsgXCJweFwiO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5sYXN0UG9zID0gcG9zO1xuICAgIH07XG4gICAgY29uc3QgZW5kRHJhZyA9ICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRyYWcpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGVuZERyYWcpO1xuXG4gICAgICAvLyBlbGVtZW50IGJla29tbXQgbGlzdCBvZiBsaXN0ZW5lciBhbHMgY2FsbGJhY2tzIGJlaSBBZW5kXG4gICAgICAvLyBmb3JlYWNoIGxpc3RlbmVyIGxpc3RlbmVyKClcbiAgICAgIC8vIC0+IEJzcCBldmVudFNlcnZpY2VcblxuICAgICAgLy8gZmt0LiBuaWNodFxuICAgICAgLy8gdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiVUlFdmVudFwiKTtcbiAgICAgIC8vIGV2dC5pbml0VUlFdmVudChcInJlc2l6ZVwiLCB0cnVlLCBmYWxzZSx3aW5kb3csMCk7XG4gICAgICAvLyB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xuXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudCh0aGlzLnNwbGl0dGVyRXZlbnQpO1xuXG4gICAgICAvLyBpbXBvcnQgZi4ganF1ZXJ5Pz9cbiAgICAgIC8vICQod2luZG93KS5yZXNpemUoKTtcblxuICAgICAgaWYgKHRoaXMuc3RvcmFnZUlkKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc3RvcmFnZUlkLCB0aGlzLmxhc3RQb3MudG9TdHJpbmcoMTApKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zcGxpdHRlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQ6IERyYWdFdmVudCkgPT4ge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7ICAgIC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb25cbiAgICAgIHRoaXMubGFzdFBvcyA9IHRoaXMuZGltZW5zaW9uID09PSBcIndpZHRoXCIgPyBldnQuY2xpZW50WCA6IGV2dC5jbGllbnRZO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZHJhZyk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZW5kRHJhZyk7XG4gICAgfSk7XG5cbiAgICAvLyBkZWZhdWx0IHBvcyBzZXR6ZW4sIG9kZXIgZ2dmLiBsZXR6dGVuIFN0YW5kIGhvbGVuXG4gICAgdGhpcy5sYXN0UG9zID0gdGhpcy5kaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IHRoaXMuc3BsaXR0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxuICAgICAgICA6IHRoaXMuc3BsaXR0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIGlmICh0aGlzLnN0b3JhZ2VJZCkge1xuICAgICAgY29uc3Qgc3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0b3JhZ2VJZCk7XG4gICAgICBjb25zdCBsYXN0c3RhdGUgPSBwYXJzZUludChzdGF0ZSA/IHN0YXRlIDogXCIwXCIsIDEwKTtcbiAgICAgIGlmIChsYXN0c3RhdGUpIHtcbiAgICAgICAgY2FsY1NpemUobGFzdHN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19