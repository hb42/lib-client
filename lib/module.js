/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexboxSplitter } from "./component";
import { FileSizePipe, IEDatePipe } from "./pipe";
import { ElectronService, ErrorService, VersionService } from "./service";
import { JwtHelperService, LogonInterceptor, LogonService } from "./service/logon";
import * as i0 from "@angular/core";
// Verhindern, dass ErrorService mehrfach instanziiert wird
/**
 * @param {?} errorService
 * @return {?}
 */
export function initErrorHandler(errorService) {
    return errorService;
}
export class LibClientModule {
}
/** @nocollapse */ LibClientModule.ɵmod = i0.ɵɵdefineNgModule({ type: LibClientModule });
/** @nocollapse */ LibClientModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LibClientModule_Factory(t) { return new (t || LibClientModule)(); }, providers: [
        ElectronService,
        ErrorService,
        VersionService,
        LogonService,
        JwtHelperService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LogonInterceptor,
            multi: true,
        },
        {
            provide: ErrorHandler,
            useFactory: initErrorHandler,
            deps: [ErrorService],
        },
    ], imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LibClientModule, { declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe], imports: [CommonModule], exports: [FlexboxSplitter, FileSizePipe, IEDatePipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LibClientModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [FlexboxSplitter, FileSizePipe, IEDatePipe],
                declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe],
                providers: [
                    ElectronService,
                    ErrorService,
                    VersionService,
                    LogonService,
                    JwtHelperService,
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: LogonInterceptor,
                        multi: true,
                    },
                    {
                        provide: ErrorHandler,
                        useFactory: initErrorHandler,
                        deps: [ErrorService],
                    },
                ],
            }]
    }], null, null); })();
