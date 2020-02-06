import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexboxSplitter } from "./component";
import { FileSizePipe, IEDatePipe } from "./pipe";
import { ElectronService, ErrorService, VersionService } from "./service";
import { JwtHelperService, LogonInterceptor, LogonService } from "./service/logon";
// Verhindern, dass ErrorService mehrfach instanziiert wird
export function initErrorHandler(errorService) {
    return errorService;
}
var LibClientModule = /** @class */ (function () {
    function LibClientModule() {
    }
    LibClientModule = __decorate([
        NgModule({
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
        })
    ], LibClientModule);
    return LibClientModule;
}());
export { LibClientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRiwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFlBQTBCO0lBQ3pELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUF3QkQ7SUFBQTtJQUNBLENBQUM7SUFEWSxlQUFlO1FBdEIzQixRQUFRLENBQUM7WUFDRSxPQUFPLEVBQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUIsT0FBTyxFQUFPLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7WUFDekQsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7WUFDekQsU0FBUyxFQUFLO2dCQUNaLGVBQWU7Z0JBQ2YsWUFBWTtnQkFDWixjQUFjO2dCQUNkLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUNoQjtvQkFDRSxPQUFPLEVBQUcsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixLQUFLLEVBQUssSUFBSTtpQkFDZjtnQkFDRDtvQkFDRSxPQUFPLEVBQUssWUFBWTtvQkFDeEIsVUFBVSxFQUFFLGdCQUFnQjtvQkFDNUIsSUFBSSxFQUFRLENBQUMsWUFBWSxDQUFDO2lCQUMzQjthQUNGO1NBQ0YsQ0FBQztPQUNDLGVBQWUsQ0FDM0I7SUFBRCxzQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEZsZXhib3hTcGxpdHRlciB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgRmlsZVNpemVQaXBlLCBJRURhdGVQaXBlIH0gZnJvbSBcIi4vcGlwZVwiO1xuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlLCBFcnJvclNlcnZpY2UsIFZlcnNpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZVwiO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSwgTG9nb25JbnRlcmNlcHRvciwgTG9nb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9sb2dvblwiO1xuXG4vLyBWZXJoaW5kZXJuLCBkYXNzIEVycm9yU2VydmljZSBtZWhyZmFjaCBpbnN0YW56aWllcnQgd2lyZFxuZXhwb3J0IGZ1bmN0aW9uIGluaXRFcnJvckhhbmRsZXIoZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHtcbiAgcmV0dXJuIGVycm9yU2VydmljZTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICAgICAgICAgIGltcG9ydHMgICAgIDogW0NvbW1vbk1vZHVsZV0sXG4gICAgICAgICAgICBleHBvcnRzICAgICA6IFtGbGV4Ym94U3BsaXR0ZXIsIEZpbGVTaXplUGlwZSwgSUVEYXRlUGlwZV0sXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtGbGV4Ym94U3BsaXR0ZXIsIEZpbGVTaXplUGlwZSwgSUVEYXRlUGlwZV0sXG4gICAgICAgICAgICBwcm92aWRlcnMgICA6IFtcbiAgICAgICAgICAgICAgRWxlY3Ryb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBFcnJvclNlcnZpY2UsXG4gICAgICAgICAgICAgIFZlcnNpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBMb2dvblNlcnZpY2UsXG4gICAgICAgICAgICAgIEp3dEhlbHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlIDogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgICAgICAgICAgdXNlQ2xhc3M6IExvZ29uSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgbXVsdGkgICA6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlICAgOiBFcnJvckhhbmRsZXIsXG4gICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogaW5pdEVycm9ySGFuZGxlcixcbiAgICAgICAgICAgICAgICBkZXBzICAgICAgOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSlcbmV4cG9ydCBjbGFzcyBMaWJDbGllbnRNb2R1bGUge1xufVxuIl19