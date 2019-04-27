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
export class JwtHelperService {
    /**
     * @param {?} str
     * @return {?}
     */
    urlBase64Decode(str) {
        /** @type {?} */
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
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
    }
    /**
     * @param {?} token
     * @return {?}
     */
    decodeToken(token) {
        /** @type {?} */
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        /** @type {?} */
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    getTokenExpirationDate(token) {
        /** @type {?} */
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        /** @type {?} */
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    isTokenExpired(token, offsetSeconds) {
        /** @type {?} */
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64decode(str) {
        /** @type {?} */
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        /** @type {?} */
        let output = "";
        str = String(str).replace(/=+$/, "");
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
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
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }))
            .join(""));
    }
}
JwtHelperService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvbG9nb24vand0LWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVUzQyxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUVwQixlQUFlLENBQUMsR0FBVzs7WUFDNUIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBQ3RELFFBQVEsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNO2FBQ1A7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxJQUFJLENBQUM7Z0JBQ2YsTUFBTTthQUNQO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksR0FBRyxDQUFDO2dCQUNkLE1BQU07YUFDUDtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUM5QztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsS0FBYTs7Y0FDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQ7Z0JBQy9ELHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7O2NBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFl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Q0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxFQUFDO2FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNoQixDQUFDO0lBQ0osQ0FBQzs7O1lBM0dGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqXG4gKiBKc29uV2ViVG9rZW4tSGFuZGxpbmdcbiAqXG4gKiBwYXlsb2FkZCBhdXMgZGVtIEpXVCBob2xlbi8gSldUIC1BYmxhdWYgdWViZXJwcnVlZmVuXG4gKlxuICogbGlmdGVkIGZyb20ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hdXRoMC9hbmd1bGFyMi1qd3R9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RIZWxwZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgdXJsQmFzZTY0RGVjb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgXCIrXCIpLnJlcGxhY2UoL18vZywgXCIvXCIpO1xuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBvdXRwdXQgKz0gXCI9PVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzoge1xuICAgICAgICBvdXRwdXQgKz0gXCI9XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGJhc2U2NHVybCBzdHJpbmchXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgZGVjb2RlVG9rZW4odG9rZW46IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdChcIi5cIik7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW5zcGVjdGVkIHRva2VuIGRvZXNuXFwndCBhcHBlYXIgdG8gYmUgYSBKV1QuIFwiICtcbiAgICAgICAgICBcIkNoZWNrIHRvIG1ha2Ugc3VyZSBpdCBoYXMgdGhyZWUgcGFydHMgYW5kIHNlZSBodHRwczovL2p3dC5pbyBmb3IgbW9yZS5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlZCA9IHRoaXMudXJsQmFzZTY0RGVjb2RlKHBhcnRzWzFdKTtcbiAgICBpZiAoIWRlY29kZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBkZWNvZGUgdGhlIHRva2VuLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCB7XG4gICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICBkZWNvZGVkID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbik7XG5cbiAgICBpZiAoIWRlY29kZWQuaGFzT3duUHJvcGVydHkoXCJleHBcIikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoZGVjb2RlZC5leHApO1xuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwdWJsaWMgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZywgb2Zmc2V0U2Vjb25kcz86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW4pO1xuICAgIG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XG5cbiAgICBpZiAoZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhKGRhdGUudmFsdWVPZigpID4gbmV3IERhdGUoKS52YWx1ZU9mKCkgKyBvZmZzZXRTZWNvbmRzICogMTAwMCk7XG4gIH1cblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tY29uZGl0aW9uYWwtYXNzaWdubWVudCBuby1iaXR3aXNlIGJhbi1jb21tYS1vcGVyYXRvciAqL1xuICAvLyBjcmVkaXRzIGZvciBkZWNvZGVyIGdvZXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2F0a1xuICBwcml2YXRlIGI2NGRlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7XG4gICAgbGV0IG91dHB1dDogc3RyaW5nID0gXCJcIjtcblxuICAgIHN0ciA9IFN0cmluZyhzdHIpLnJlcGxhY2UoLz0rJC8sIFwiXCIpO1xuXG4gICAgaWYgKHN0ci5sZW5ndGggJSA0ID09PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCInYXRvYicgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLlwiKTtcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlcnNcbiAgICAgICAgbGV0IGJjOiBudW1iZXIgPSAwLCBiczogYW55LCBidWZmZXI6IGFueSwgaWR4OiBudW1iZXIgPSAwO1xuICAgICAgICAvLyBnZXQgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgKGJ1ZmZlciA9IHN0ci5jaGFyQXQoaWR4KyspKTtcbiAgICAgICAgLy8gY2hhcmFjdGVyIGZvdW5kIGluIHRhYmxlPyBpbml0aWFsaXplIGJpdCBzdG9yYWdlIGFuZCBhZGQgaXRzIGFzY2lpIHZhbHVlO1xuICAgICAgICB+YnVmZmVyICYmXG4gICAgICAgIChcbiAgICAgICAgICAgIChicyA9IGJjICUgNCA/IGJzICogNjQgKyBidWZmZXIgOiBidWZmZXIpLFxuICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBub3QgZmlyc3Qgb2YgZWFjaCA0IGNoYXJhY3RlcnMsXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIG9uZSBhc2NpaSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIGJjKysgJSA0XG4gICAgICAgIClcbiAgICAgICAgICAgID8gKG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIChicyA+PiAoKC0yICogYmMpICYgNikpKSlcbiAgICAgICAgICAgIDogMFxuICAgICkge1xuICAgICAgLy8gdHJ5IHRvIGZpbmQgY2hhcmFjdGVyIGluIHRhYmxlICgwLTYzLCBub3QgZm91bmQgPT4gLTEpXG4gICAgICBidWZmZXIgPSBjaGFycy5pbmRleE9mKGJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyOiBhbnkpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBBcnJheS5wcm90b3R5cGUubWFwXG4gICAgICAgICAgICAuY2FsbCh0aGlzLmI2NGRlY29kZShzdHIpLCAoYzogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBcIiVcIiArIChcIjAwXCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oXCJcIiksXG4gICAgKTtcbiAgfVxuXG59XG4iXX0=