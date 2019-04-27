/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
/**
 * JsonWebToken-Handling
 *
 * payloadd aus dem JWT holen/ JWT -Ablauf ueberpruefen
 *
 * lifted from {\@link https://github.com/auth0/angular2-jwt}
 */
var JwtHelperService = /** @class */ (function () {
    function JwtHelperService() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.urlBase64Decode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += "==";
                break;
            }
            case 3: {
                output += "=";
                break;
            }
            default: {
                throw new Error("Illegal base64url string!");
            }
        }
        return this.b64DecodeUnicode(output);
    };
    /**
     * @param {?} token
     * @return {?}
     */
    JwtHelperService.prototype.decodeToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        /** @type {?} */
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    };
    /**
     * @param {?} token
     * @return {?}
     */
    JwtHelperService.prototype.getTokenExpirationDate = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        /** @type {?} */
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    JwtHelperService.prototype.isTokenExpired = /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    function (token, offsetSeconds) {
        /** @type {?} */
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64decode = /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        /** @type {?} */
        var output = "";
        str = String(str).replace(/=+$/, "");
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
        // initialize result and counters
        var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64DecodeUnicode = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }))
            .join(""));
    };
    JwtHelperService.decorators = [
        { type: Injectable }
    ];
    return JwtHelperService;
}());
export { JwtHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvbG9nb24vand0LWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVMzQztJQUFBO0lBNkdBLENBQUM7Ozs7O0lBMUdRLDBDQUFlOzs7O0lBQXRCLFVBQXVCLEdBQVc7O1lBQzVCLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztRQUN0RCxRQUFRLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTTthQUNQO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksSUFBSSxDQUFDO2dCQUNmLE1BQU07YUFDUDtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxJQUFJLEdBQUcsQ0FBQztnQkFDZCxNQUFNO2FBQ1A7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7YUFDOUM7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU0sc0NBQVc7Ozs7SUFBbEIsVUFBbUIsS0FBYTs7WUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQ7Z0JBQy9ELHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7O1lBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFTSxpREFBc0I7Ozs7SUFBN0IsVUFBOEIsS0FBYTs7WUFDckMsT0FBWTtRQUNoQixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNiOztZQUVLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFTSx5Q0FBYzs7Ozs7SUFBckIsVUFBc0IsS0FBYSxFQUFFLGFBQXNCOztZQUNuRCxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQztRQUMvQyxhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUVuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsNkVBQTZFO0lBQzdFLHFEQUFxRDs7Ozs7Ozs7SUFDN0Msb0NBQVM7Ozs7Ozs7SUFBakIsVUFBa0IsR0FBVzs7WUFDckIsS0FBSyxHQUFHLG1FQUFtRTs7WUFDN0UsTUFBTSxHQUFXLEVBQUU7UUFFdkIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUN0RjtRQUVEO1FBQ0ksaUNBQWlDO1FBQ2pDLElBQUksRUFBRSxHQUFXLENBQUMsRUFBRSxFQUFFLFNBQUssRUFBRSxNQUFNLFNBQUssRUFBRSxHQUFHLEdBQVcsQ0FBQztRQUN6RCxxQkFBcUI7UUFDckIsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLDRFQUE0RTtRQUM1RSxDQUFDLE1BQU07WUFDUCxDQUNJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLHlDQUF5QztnQkFDekMsa0RBQWtEO2dCQUN0RCxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQ1g7WUFDRyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQyxFQUNUO1lBQ0EseURBQXlEO1lBQ3pELE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7O0lBRU8sMkNBQWdCOzs7OztJQUF4QixVQUF5QixHQUFRO1FBQy9CLE9BQU8sa0JBQWtCLENBQ3JCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRzthQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7OztRQUFFLFVBQUMsQ0FBTTtZQUNoQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsRUFBQzthQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDaEIsQ0FBQztJQUNKLENBQUM7O2dCQTNHRixVQUFVOztJQTZHWCx1QkFBQztDQUFBLEFBN0dELElBNkdDO1NBNUdZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIEpzb25XZWJUb2tlbi1IYW5kbGluZ1xuICpcbiAqIHBheWxvYWRkIGF1cyBkZW0gSldUIGhvbGVuLyBKV1QgLUFibGF1ZiB1ZWJlcnBydWVmZW5cbiAqXG4gKiBsaWZ0ZWQgZnJvbSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2F1dGgwL2FuZ3VsYXIyLWp3dH1cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dEhlbHBlclNlcnZpY2Uge1xuXG4gIHB1YmxpYyB1cmxCYXNlNjREZWNvZGUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBvdXRwdXQgPSBzdHIucmVwbGFjZSgvLS9nLCBcIitcIikucmVwbGFjZSgvXy9nLCBcIi9cIik7XG4gICAgc3dpdGNoIChvdXRwdXQubGVuZ3RoICUgNCkge1xuICAgICAgY2FzZSAwOiB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIG91dHB1dCArPSBcIj09XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAzOiB7XG4gICAgICAgIG91dHB1dCArPSBcIj1cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyFcIik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmI2NERlY29kZVVuaWNvZGUob3V0cHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBkZWNvZGVUb2tlbih0b2tlbjogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwYXJ0cyA9IHRva2VuLnNwbGl0KFwiLlwiKTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBpbnNwZWN0ZWQgdG9rZW4gZG9lc25cXCd0IGFwcGVhciB0byBiZSBhIEpXVC4gXCIgK1xuICAgICAgICAgIFwiQ2hlY2sgdG8gbWFrZSBzdXJlIGl0IGhhcyB0aHJlZSBwYXJ0cyBhbmQgc2VlIGh0dHBzOi8vand0LmlvIGZvciBtb3JlLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGVkID0gdGhpcy51cmxCYXNlNjREZWNvZGUocGFydHNbMV0pO1xuICAgIGlmICghZGVjb2RlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGRlY29kZSB0aGUgdG9rZW4uXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRlY29kZWQpO1xuICB9XG5cbiAgcHVibGljIGdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW46IHN0cmluZyk6IERhdGUgfCBudWxsIHtcbiAgICBsZXQgZGVjb2RlZDogYW55O1xuICAgIGRlY29kZWQgPSB0aGlzLmRlY29kZVRva2VuKHRva2VuKTtcblxuICAgIGlmICghZGVjb2RlZC5oYXNPd25Qcm9wZXJ0eShcImV4cFwiKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhkZWNvZGVkLmV4cCk7XG5cbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBpc1Rva2VuRXhwaXJlZCh0b2tlbjogc3RyaW5nLCBvZmZzZXRTZWNvbmRzPzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbik7XG4gICAgb2Zmc2V0U2Vjb25kcyA9IG9mZnNldFNlY29uZHMgfHwgMDtcblxuICAgIGlmIChkYXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEoZGF0ZS52YWx1ZU9mKCkgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSArIG9mZnNldFNlY29uZHMgKiAxMDAwKTtcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlOiBuby1jb25kaXRpb25hbC1hc3NpZ25tZW50IG5vLWJpdHdpc2UgYmFuLWNvbW1hLW9wZXJhdG9yICovXG4gIC8vIGNyZWRpdHMgZm9yIGRlY29kZXIgZ29lcyB0byBodHRwczovL2dpdGh1Yi5jb20vYXRrXG4gIHByaXZhdGUgYjY0ZGVjb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgICBsZXQgb3V0cHV0OiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgc3RyID0gU3RyaW5nKHN0cikucmVwbGFjZSgvPSskLywgXCJcIik7XG5cbiAgICBpZiAoc3RyLmxlbmd0aCAlIDQgPT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIidhdG9iJyBmYWlsZWQ6IFRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuXCIpO1xuICAgIH1cblxuICAgIGZvciAoXG4gICAgICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyc1xuICAgICAgICBsZXQgYmM6IG51bWJlciA9IDAsIGJzOiBhbnksIGJ1ZmZlcjogYW55LCBpZHg6IG51bWJlciA9IDA7XG4gICAgICAgIC8vIGdldCBuZXh0IGNoYXJhY3RlclxuICAgICAgICAoYnVmZmVyID0gc3RyLmNoYXJBdChpZHgrKykpO1xuICAgICAgICAvLyBjaGFyYWN0ZXIgZm91bmQgaW4gdGFibGU/IGluaXRpYWxpemUgYml0IHN0b3JhZ2UgYW5kIGFkZCBpdHMgYXNjaWkgdmFsdWU7XG4gICAgICAgIH5idWZmZXIgJiZcbiAgICAgICAgKFxuICAgICAgICAgICAgKGJzID0gYmMgJSA0ID8gYnMgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlciksXG4gICAgICAgICAgICAgICAgLy8gYW5kIGlmIG5vdCBmaXJzdCBvZiBlYWNoIDQgY2hhcmFjdGVycyxcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gb25lIGFzY2lpIGNoYXJhY3RlclxuICAgICAgICAgICAgYmMrKyAlIDRcbiAgICAgICAgKVxuICAgICAgICAgICAgPyAob3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMjU1ICYgKGJzID4+ICgoLTIgKiBiYykgJiA2KSkpKVxuICAgICAgICAgICAgOiAwXG4gICAgKSB7XG4gICAgICAvLyB0cnkgdG8gZmluZCBjaGFyYWN0ZXIgaW4gdGFibGUgKDAtNjMsIG5vdCBmb3VuZCA9PiAtMSlcbiAgICAgIGJ1ZmZlciA9IGNoYXJzLmluZGV4T2YoYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHI6IGFueSkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5tYXBcbiAgICAgICAgICAgIC5jYWxsKHRoaXMuYjY0ZGVjb2RlKHN0ciksIChjOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiJVwiICsgKFwiMDBcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIlwiKSxcbiAgICApO1xuICB9XG5cbn1cbiJdfQ==