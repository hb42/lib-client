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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7O0FBR25GLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxZQUEwQjtJQUN6RCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBd0JELE1BQU0sT0FBTyxlQUFlOzs7WUF0QjNCLFFBQVEsU0FBQztnQkFDRSxPQUFPLEVBQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQzVCLE9BQU8sRUFBTyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO2dCQUN6RCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztnQkFDekQsU0FBUyxFQUFLO29CQUNaLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixjQUFjO29CQUNkLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQjt3QkFDRSxPQUFPLEVBQUcsaUJBQWlCO3dCQUMzQixRQUFRLEVBQUUsZ0JBQWdCO3dCQUMxQixLQUFLLEVBQUssSUFBSTtxQkFDZjtvQkFDRDt3QkFDRSxPQUFPLEVBQUssWUFBWTt3QkFDeEIsVUFBVSxFQUFFLGdCQUFnQjt3QkFDNUIsSUFBSSxFQUFRLENBQUMsWUFBWSxDQUFDO3FCQUMzQjtpQkFDRjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEVycm9ySGFuZGxlciwgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBGbGV4Ym94U3BsaXR0ZXIgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcbmltcG9ydCB7IEZpbGVTaXplUGlwZSwgSUVEYXRlUGlwZSB9IGZyb20gXCIuL3BpcGVcIjtcbmltcG9ydCB7IEVsZWN0cm9uU2VydmljZSwgRXJyb3JTZXJ2aWNlLCBWZXJzaW9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VcIjtcbmltcG9ydCB7IEp3dEhlbHBlclNlcnZpY2UsIExvZ29uSW50ZXJjZXB0b3IsIExvZ29uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvbG9nb25cIjtcblxuLy8gVmVyaGluZGVybiwgZGFzcyBFcnJvclNlcnZpY2UgbWVocmZhY2ggaW5zdGFuemlpZXJ0IHdpcmRcbmV4cG9ydCBmdW5jdGlvbiBpbml0RXJyb3JIYW5kbGVyKGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7XG4gIHJldHVybiBlcnJvclNlcnZpY2U7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgICAgICAgICBpbXBvcnRzICAgICA6IFtDb21tb25Nb2R1bGVdLFxuICAgICAgICAgICAgZXhwb3J0cyAgICAgOiBbRmxleGJveFNwbGl0dGVyLCBGaWxlU2l6ZVBpcGUsIElFRGF0ZVBpcGVdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbRmxleGJveFNwbGl0dGVyLCBGaWxlU2l6ZVBpcGUsIElFRGF0ZVBpcGVdLFxuICAgICAgICAgICAgcHJvdmlkZXJzICAgOiBbXG4gICAgICAgICAgICAgIEVsZWN0cm9uU2VydmljZSxcbiAgICAgICAgICAgICAgRXJyb3JTZXJ2aWNlLFxuICAgICAgICAgICAgICBWZXJzaW9uU2VydmljZSxcbiAgICAgICAgICAgICAgTG9nb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBKd3RIZWxwZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZSA6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBMb2dvbkludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgIG11bHRpICAgOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZSAgIDogRXJyb3JIYW5kbGVyLFxuICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGluaXRFcnJvckhhbmRsZXIsXG4gICAgICAgICAgICAgICAgZGVwcyAgICAgIDogW0Vycm9yU2VydmljZV0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pXG5leHBvcnQgY2xhc3MgTGliQ2xpZW50TW9kdWxlIHtcbn1cbiJdfQ==