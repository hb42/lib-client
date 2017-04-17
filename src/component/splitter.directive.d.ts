import { ElementRef, OnInit, Renderer } from "@angular/core";
export declare class FlexboxSplitter implements OnInit {
    private el;
    private renderer;
    static SPLITTER_EVENT: string;
    private storageId;
    private splitter;
    private prevEl;
    private nextEl;
    private dimension;
    private splitterEvent;
    private lastPos;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    private getProp(elem, prop);
    private initSplitter();
}
