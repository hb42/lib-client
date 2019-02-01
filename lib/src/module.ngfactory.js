/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./module";
import * as i2 from "@angular/common";
import * as i3 from "./service/electron.service";
import * as i4 from "./service/error.service";
import * as i5 from "./service/version.service";
import * as i6 from "@angular/common/http";
import * as i7 from "./service/logon/jwt-helper.service";
import * as i8 from "./service/logon/logon.service";
import * as i9 from "./service/logon/logonToken";
import * as i10 from "./service/logon/logon-interceptor";
var LibClientModuleNgFactory = i0.ɵcmf(i1.LibClientModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(4608, i3.ElectronService, i3.ElectronService, []), i0.ɵmpd(4608, i4.ErrorService, i4.ErrorService, [i0.Injector, i3.ElectronService]), i0.ɵmpd(4608, i5.VersionService, i5.VersionService, [i6.HttpClient, i3.ElectronService]), i0.ɵmpd(4608, i7.JwtHelperService, i7.JwtHelperService, []), i0.ɵmpd(4608, i8.LogonService, i8.LogonService, [i9.LOGON_OPTIONS, i0.Injector, i7.JwtHelperService]), i0.ɵmpd(5120, i6.HTTP_INTERCEPTORS, function (p0_0, p0_1) { return [new i10.LogonInterceptor(p0_0, p0_1)]; }, [i8.LogonService, i4.ErrorService]), i0.ɵmpd(5120, i0.ErrorHandler, i1.initErrorHandler, [i4.ErrorService]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i1.LibClientModule, i1.LibClientModule, [])]); });
export { LibClientModuleNgFactory as LibClientModuleNgFactory };
//# sourceMappingURL=module.ngfactory.js.map