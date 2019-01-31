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
import { ElementRef, OnInit } from "@angular/core";
export declare class FlexboxSplitter implements OnInit {
    private el;
    static SPLITTER_EVENT: string;
    private storageId;
    private splitter;
    private prevEl;
    private nextEl;
    private dimension;
    private splitterEvent;
    private lastPos;
    constructor(el: ElementRef);
    ngOnInit(): void;
    private getProp;
    private initSplitter;
}
