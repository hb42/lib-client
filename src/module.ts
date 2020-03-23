import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";

import { FlexboxSplitter } from "./component/splitter.directive";
import { FileSizePipe } from "./pipe/filesize.pipe";
import { IEDatePipe } from "./pipe/iedate.pipe";
import { ElectronService } from "./service/electron.service";
import { ErrorService } from "./service/error.service";
import { JwtHelperService } from "./service/logon/jwt-helper.service";
import { LogonInterceptor } from "./service/logon/logon-interceptor";
import { LogonService } from "./service/logon/logon.service";
import { VersionService } from "./service/version.service";

// Verhindern, dass ErrorService mehrfach instanziiert wird
export function initErrorHandler(errorService: ErrorService) {
  return errorService;
}

@NgModule({
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
export class LibClientModule {}
