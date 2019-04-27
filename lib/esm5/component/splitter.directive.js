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
var FlexboxSplitter = /** @class */ (function () {
    function FlexboxSplitter(el) {
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
    FlexboxSplitter.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Umgebung holen
        this.prevEl = (/** @type {?} */ (this.splitter.previousElementSibling));
        this.nextEl = (/** @type {?} */ (this.splitter.nextElementSibling));
        /** @type {?} */
        var parent = (/** @type {?} */ (this.splitter.parentElement));
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
    };
    /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    FlexboxSplitter.prototype.getProp = /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    function (elem, prop) {
        // window.getComputedStyle(elem).getPropertyValue(prop);
        // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
        return window.getComputedStyle(elem)[(/** @type {?} */ (prop))];
    };
    /**
     * @private
     * @return {?}
     */
    FlexboxSplitter.prototype.initSplitter = /**
     * @private
     * @return {?}
     */
    function () {
        // let self: FlexboxSplitter = this;
        var _this = this;
        // let self: FlexboxSplitter = this;
        // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
        /** @type {?} */
        var params = { bubbles: false, cancelable: false, detail: undefined };
        this.splitterEvent = document.createEvent("CustomEvent");
        this.splitterEvent
            .initCustomEvent(FlexboxSplitter.SPLITTER_EVENT, params.bubbles, params.cancelable, params.detail);
        /** @type {?} */
        var drag = (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
        });
        /** @type {?} */
        var calcSize = (/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) {
            /** @type {?} */
            var newsize;
            /** @type {?} */
            var diff = pos - _this.lastPos;
            // if (self.chgPrev) {
            newsize = parseInt(_this.getProp(_this.prevEl, _this.dimension), 10) + diff;
            _this.prevEl.style[(/** @type {?} */ (_this.dimension))] = newsize + "px";
            // }
            // if (self.chgNext) {
            newsize = parseInt(_this.getProp(_this.nextEl, _this.dimension), 10) - diff;
            _this.nextEl.style[(/** @type {?} */ (_this.dimension))] = newsize + "px";
            // }
            _this.lastPos = pos;
        });
        /** @type {?} */
        var endDrag = (/**
         * @return {?}
         */
        function () {
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", endDrag);
            // element bekommt list of listener als callbacks bei Aend
            // foreach listener listener()
            // -> Bsp eventService
            // fkt. nicht
            // var evt = document.createEvent("UIEvent");
            // evt.initUIEvent("resize", true, false,window,0);
            // window.dispatchEvent(evt);
            window.dispatchEvent(_this.splitterEvent);
            // import f. jquery??
            // $(window).resize();
            if (_this.storageId) {
                localStorage.setItem(_this.storageId, _this.lastPos.toString(10));
            }
        });
        this.splitter.addEventListener("mousedown", (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            evt.preventDefault(); // prevent text selection
            _this.lastPos = _this.dimension === "width" ? evt.clientX : evt.clientY;
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
        }));
        // default pos setzen, oder ggf. letzten Stand holen
        this.lastPos = this.dimension === "width" ? this.splitter.getBoundingClientRect().left
            : this.splitter.getBoundingClientRect().top;
        if (this.storageId) {
            /** @type {?} */
            var state = localStorage.getItem(this.storageId);
            /** @type {?} */
            var laststate = parseInt(state ? state : "0", 10);
            if (laststate) {
                calcSize(laststate);
            }
        }
    };
    FlexboxSplitter.SPLITTER_EVENT = "hbsplitter";
    FlexboxSplitter.decorators = [
        { type: Directive, args: [{
                    selector: "[fb-splitter]",
                },] }
    ];
    /** @nocollapse */
    FlexboxSplitter.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FlexboxSplitter.propDecorators = {
        storageId: [{ type: Input }]
    };
    return FlexboxSplitter;
}());
export { FlexboxSplitter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudC9zcGxpdHRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEdBRVIsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFxQkUseUJBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZOztRQWJqQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBV2hDLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFHMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRU0sa0NBQVE7OztJQUFmO1FBQ0UsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBZSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBZSxDQUFDOztZQUN4RCxNQUFNLEdBQVksbUJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQVc7UUFDOUQsMkJBQTJCO1FBQzNCLG9EQUFvRDtRQUNwRCw4RUFBOEU7UUFDOUUsSUFBSTtRQUNKLDJEQUEyRDtRQUMzRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBQSxhQUFhLEVBQU8sQ0FBQyxHQUFHLGdCQUFnQixD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LElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTs7Z0JBQ1osS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Z0JBQzVDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDbkQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7SUFDSCxDQUFDO0lBMUhhLDhCQUFjLEdBQVcsWUFBWSxDQUFDOztnQkFMckQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnQkFQRyxVQUFVOzs7NEJBYVgsS0FBSzs7SUF5SFIsc0JBQUM7Q0FBQSxBQWpJRCxJQWlJQztTQTlIWSxlQUFlOzs7SUFFMUIsK0JBQW9EOzs7OztJQUdwRCxvQ0FBd0M7Ozs7O0lBRXhDLG1DQUE4Qjs7Ozs7SUFDOUIsaUNBQTRCOzs7OztJQUM1QixpQ0FBNEI7Ozs7O0lBQzVCLG9DQUEwQjs7Ozs7SUFJMUIsd0NBQW1DOzs7OztJQUVuQyxrQ0FBNEI7Ozs7O0lBRWhCLDZCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXR0cmlidXQgZmItc3BsaXR0ZXJcbiAqXG4gKiBTcGxpdHRlciBmdWVyIEZsZXhib3hcbiAqXG4gKiBEaWUgVm9yYXVzc2V0enVuZyBpc3QsIGRhc3MgZGFzIFBhcmVudC1FbGVtZW50IG1pdCBkaXNwbGF5OmZsZXggYXVzZ2V6ZWljaG5ldCBpc3QuXG4gKiBEaWUgU3BsaXR0ZXJhdXNyaWNodHVuZyB3aXJkIHZvbiBkZXIgZmxleERpcmVjdGlvbi1FaWdlbnNjaGFmdCBkZXMgUGFyZW50IGFiZ2VsZWl0ZXRcbiAqIChcInJvd1wiIGhvcml6b250YWxlciBTcGxpdHRlciwgXCJjb2x1bW5cIiB2ZXJ0aWthbCkuXG4gKiBEZXIgU3BsaXR0ZXIgbXVzcyB6d2lzY2hlbiBkZW4gYmVpZGVuIEVsZW1lbnQgcGxhemllcnQgd2VyZGVuLCBkaWUgdmVyYWVuZGVydCB3ZXJkZW5cbiAqIHNvbGxlbiwgXCJvcmRlclwiIGZ1bmt0aW9uaWVydCBoaWVyIG5pY2h0LiBNaW5kZXN0ZW5zIGVpbmVzIGRlciBFbGVtZW50ZSBtdXNzIGVpbmUgZmVzdGVcbiAqIEJyZWl0ZS9Ib2VoZSBoYWJlbiAoZmxleEdyb3c6MCwgYnp3IGZsZXg6MCAwIGF1dG8gKyB3aWR0aDovaGVpZ2h0OiBYWHB4KS4gU2lubnZvbGxcbiAqIGlzdCB6dWRlbSBtaW4td2lkdGggYnp3LiBtaW4taGVpZ2h0LiBEYXMgendlaXRlIEVsZW1lbnQga2FubiBmbGV4OjEgYnp3LiBmbGV4OmF1dG9cbiAqIGJla29tbWVuLCBkYW5uIGt1ZW1tZXJ0IHNpY2ggRmxleGJveCB1bXMgQW5wYXNzZW4uXG4gKlxuICogRGFzIHBhcmVudC1FbGVtZW50IGJyYXVjaHQgYXVzc2VyZGVtIGRlbiBTdHlsZSBcImFsaWduLWl0ZW1zOiBzdHJldGNoXCIgKGlzdCBkZWZhdWx0KS5cbiAqIERhbWl0IG92ZXJmbG93IGltIGlubmVyZW4gRElWIGZ1bmt0aW9uaWVydCBtdWVzc2VuIGRpZSBGbGV4Ym94LUl0ZW1zIHBvc2l0aW9uOnJlbGF0aXZlXG4gKiB1bmQgZGVyIGlubmVyZSBESVYgcG9zaXRpb246YWJzb2x1dGUgYmVrb21tZW4uXG4gKlxuICogaW5wdXRzOiBbc3RvcmFnZUlkXSAgLSBLZW5udW5nIGZ1ZXIgZGllIFNwbGl0dGVycG9zaXRpb24gaW4gZGVyIGxvY2FsU3RvcmFnZVxuICogICAgICAgICAgICAgICAgICAgICAgICAobGVlciAtPiBuaWNodCBzcGVpY2hlcm4pXG4gKlxuICogUXVlbGxlOlxuICogaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8yMDEzLzEyL2FwcGxpY2F0aW9uLWxheW91dC13aXRoLWNzczMtZmxleGlibGUtYm94LW1vZHVsZS9cbiAqL1xuXG5pbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uSW5pdCxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltmYi1zcGxpdHRlcl1cIixcbn0pXG5leHBvcnQgY2xhc3MgRmxleGJveFNwbGl0dGVyIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgc3RhdGljIFNQTElUVEVSX0VWRU5UOiBzdHJpbmcgPSBcImhic3BsaXR0ZXJcIjtcblxuICAvLyBpbnB1dHNcbiAgQElucHV0KCkgcHJpdmF0ZSBzdG9yYWdlSWQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgcHJpdmF0ZSBzcGxpdHRlcjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgcHJldkVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBuZXh0RWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGRpbWVuc2lvbjogc3RyaW5nO1xuICAvLyBwcml2YXRlIGNoZ1ByZXY6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gcHJpdmF0ZSBjaGdOZXh0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBzcGxpdHRlckV2ZW50OiBDdXN0b21FdmVudDtcblxuICBwcml2YXRlIGxhc3RQb3M6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIGNvbnNvbGUuZGVidWcoXCJjJ3RvciBmbGV4Ym94c3BsaXR0ZXJcIik7XG4gICAgdGhpcy5zcGxpdHRlciA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLy8gVW1nZWJ1bmcgaG9sZW5cbiAgICB0aGlzLnByZXZFbCA9IHRoaXMuc3BsaXR0ZXIucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLm5leHRFbCA9IHRoaXMuc3BsaXR0ZXIubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IHBhcmVudDogRWxlbWVudCA9IHRoaXMuc3BsaXR0ZXIucGFyZW50RWxlbWVudCBhcyBFbGVtZW50O1xuICAgIC8vIHBhcmVudCBtdXNzIGZsZXhib3ggc2VpblxuICAgIC8vIGlmICh0aGlzLmdldFByb3AocGFyZW50LCBcImRpc3BsYXlcIikgIT09IFwiZmxleFwiKSB7XG4gICAgLy8gICB0aHJvdyBcIkVycm9yOiBwYXJlbnQgZWxlbWVudCBmb3Igc3BsaXR0ZXIgbXVzdCBoYXZlIHN0eWxlIGRpc3BsYXk6ZmxleC5cIjtcbiAgICAvLyB9XG4gICAgLy8gUmljaHR1bmcgZmVzdGxlZ2VuIHVuZCBwYXNzZW5kZSBTdHlsZXMgZnVlciBkZW4gU3BsaXR0ZXJcbiAgICBpZiAodGhpcy5nZXRQcm9wKHBhcmVudCwgXCJmbGV4RGlyZWN0aW9uXCIpID09PSBcInJvd1wiKSB7XG4gICAgICB0aGlzLmRpbWVuc2lvbiA9IFwid2lkdGhcIjtcbiAgICAgIHRoaXMuc3BsaXR0ZXIuc3R5bGVbXCJib3JkZXItbGVmdFwiIGFzIGFueV0gPSBcIjFweCBzb2xpZCBncmF5XCI7XG4gICAgICB0aGlzLnNwbGl0dGVyLnN0eWxlW1wiY3Vyc29yXCJdID0gXCJjb2wtcmVzaXplXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGltZW5zaW9uID0gXCJoZWlnaHRcIjtcbiAgICAgIHRoaXMuc3BsaXR0ZXIuc3R5bGVbXCJib3JkZXItdG9wXCIgYXMgYW55XSA9IFwiMXB4IHNvbGlkIGdyYXlcIjtcbiAgICAgIHRoaXMuc3BsaXR0ZXIuc3R5bGVbXCJjdXJzb3JcIl0gPSBcInJvdy1yZXNpemVcIjtcbiAgICB9XG4gICAgdGhpcy5zcGxpdHRlci5zdHlsZVtcImJhY2tncm91bmRcIl0gPSBcIiNlZWVcIjtcbiAgICB0aGlzLnNwbGl0dGVyLnN0eWxlW3RoaXMuZGltZW5zaW9uIGFzIGFueV0gPSBcIjZweFwiO1xuXG4gICAgLy8gRWxlbWVudGUgbnVyIGZ1ZXIgZml4ZSBHcm9lc3NlIGFlbmRlcm4sIGZsZXhHcm93ID4wID0gYXV0b1xuICAgIC8vIHRoaXMuY2hnUHJldiA9IHRoaXMuZ2V0UHJvcCh0aGlzLnByZXZFbCwgXCJmbGV4R3Jvd1wiKSA9PT0gMDtcbiAgICAvLyB0aGlzLmNoZ05leHQgPSB0aGlzLmdldFByb3AodGhpcy5uZXh0RWwsIFwiZmxleEdyb3dcIikgPT09IDA7XG4gICAgLy8gbG9zIGdlaHRcInNcbiAgICB0aGlzLmluaXRTcGxpdHRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9wKGVsZW06IEVsZW1lbnQsIHByb3A6IHN0cmluZyk6IGFueSB7XG4gICAgLy8gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcbiAgICAvLyBpbSAqSUUqIGZrdC4gZ2V0UHJvcGVydHlWYWx1ZSgpIG5pY2h0LCBhbHQuIGRpcmVrdGVyIFp1Z3JpZmYgbWl0IFtcInByb3BcIl1cbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlbcHJvcCBhcyBhbnldO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0U3BsaXR0ZXIoKSB7XG4gICAgLy8gbGV0IHNlbGY6IEZsZXhib3hTcGxpdHRlciA9IHRoaXM7XG5cbiAgICAvLyB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoXCJoYi5zcGxpdHRlclwiKTsgZmt0LiBsZWlkZXIgbmljaHQgaW0gKklFKiwgc3RhdHQgZGVzc2VuOlxuICAgIGNvbnN0IHBhcmFtczogYW55ID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XG4gICAgdGhpcy5zcGxpdHRlckV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICB0aGlzLnNwbGl0dGVyRXZlbnRcbiAgICAgICAgLmluaXRDdXN0b21FdmVudChGbGV4Ym94U3BsaXR0ZXIuU1BMSVRURVJfRVZFTlQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG5cbiAgICBjb25zdCBkcmFnID0gKGV2dDogRHJhZ0V2ZW50KSA9PiB7XG4gICAgICB0aGlzLmRpbWVuc2lvbiA9PT0gXCJ3aWR0aFwiID8gY2FsY1NpemUoZXZ0LmNsaWVudFgpIDogY2FsY1NpemUoZXZ0LmNsaWVudFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBjYWxjU2l6ZSA9IChwb3M6IG51bWJlcikgPT4ge1xuICAgICAgbGV0IG5ld3NpemU6IG51bWJlcjtcbiAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IHBvcyAtIHRoaXMubGFzdFBvcztcbiAgICAgIC8vIGlmIChzZWxmLmNoZ1ByZXYpIHtcbiAgICAgIG5ld3NpemUgPSBwYXJzZUludCh0aGlzLmdldFByb3AodGhpcy5wcmV2RWwsIHRoaXMuZGltZW5zaW9uKSwgMTApICsgZGlmZjtcbiAgICAgIHRoaXMucHJldkVsLnN0eWxlW3RoaXMuZGltZW5zaW9uIGFzIGFueV0gPSBuZXdzaXplICsgXCJweFwiO1xuICAgICAgLy8gfVxuICAgICAgLy8gaWYgKHNlbGYuY2hnTmV4dCkge1xuICAgICAgbmV3c2l6ZSA9IHBhcnNlSW50KHRoaXMuZ2V0UHJvcCh0aGlzLm5leHRFbCwgdGhpcy5kaW1lbnNpb24pLCAxMCkgLSBkaWZmO1xuICAgICAgdGhpcy5uZXh0RWwuc3R5bGVbdGhpcy5kaW1lbnNpb24gYXMgYW55XSA9IG5ld3NpemUgKyBcInB4XCI7XG4gICAgICAvLyB9XG4gICAgICB0aGlzLmxhc3RQb3MgPSBwb3M7XG4gICAgfTtcbiAgICBjb25zdCBlbmREcmFnID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZHJhZyk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZW5kRHJhZyk7XG5cbiAgICAgIC8vIGVsZW1lbnQgYmVrb21tdCBsaXN0IG9mIGxpc3RlbmVyIGFscyBjYWxsYmFja3MgYmVpIEFlbmRcbiAgICAgIC8vIGZvcmVhY2ggbGlzdGVuZXIgbGlzdGVuZXIoKVxuICAgICAgLy8gLT4gQnNwIGV2ZW50U2VydmljZVxuXG4gICAgICAvLyBma3QuIG5pY2h0XG4gICAgICAvLyB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJVSUV2ZW50XCIpO1xuICAgICAgLy8gZXZ0LmluaXRVSUV2ZW50KFwicmVzaXplXCIsIHRydWUsIGZhbHNlLHdpbmRvdywwKTtcbiAgICAgIC8vIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KHRoaXMuc3BsaXR0ZXJFdmVudCk7XG5cbiAgICAgIC8vIGltcG9ydCBmLiBqcXVlcnk/P1xuICAgICAgLy8gJCh3aW5kb3cpLnJlc2l6ZSgpO1xuXG4gICAgICBpZiAodGhpcy5zdG9yYWdlSWQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zdG9yYWdlSWQsIHRoaXMubGFzdFBvcy50b1N0cmluZygxMCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNwbGl0dGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dDogRHJhZ0V2ZW50KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTsgICAgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvblxuICAgICAgdGhpcy5sYXN0UG9zID0gdGhpcy5kaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IGV2dC5jbGllbnRYIDogZXZ0LmNsaWVudFk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmFnKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBlbmREcmFnKTtcbiAgICB9KTtcblxuICAgIC8vIGRlZmF1bHQgcG9zIHNldHplbiwgb2RlciBnZ2YuIGxldHp0ZW4gU3RhbmQgaG9sZW5cbiAgICB0aGlzLmxhc3RQb3MgPSB0aGlzLmRpbWVuc2lvbiA9PT0gXCJ3aWR0aFwiID8gdGhpcy5zcGxpdHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIDogdGhpcy5zcGxpdHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgaWYgKHRoaXMuc3RvcmFnZUlkKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUlkKTtcbiAgICAgIGNvbnN0IGxhc3RzdGF0ZSA9IHBhcnNlSW50KHN0YXRlID8gc3RhdGUgOiBcIjBcIiwgMTApO1xuICAgICAgaWYgKGxhc3RzdGF0ZSkge1xuICAgICAgICBjYWxjU2l6ZShsYXN0c3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=