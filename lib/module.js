/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexboxSplitter } from "./component";
import { FileSizePipe, IEDatePipe } from "./pipe";
import { ElectronService, ErrorService, VersionService } from "./service";
import { JwtHelperService, LogonInterceptor, LogonService } from "./service/logon";
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
LibClientModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
