import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
/**
 * JsonWebToken-Handling
 *
 * payloadd aus dem JWT holen/ JWT -Ablauf ueberpruefen
 *
 * lifted from {@link https://github.com/auth0/angular2-jwt}
 */
var JwtHelperService = /** @class */ (function () {
    function JwtHelperService() {
    }
    JwtHelperService.prototype.urlBase64Decode = function (str) {
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
    JwtHelperService.prototype.decodeToken = function (token) {
        var parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    };
    JwtHelperService.prototype.getTokenExpirationDate = function (token) {
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    JwtHelperService.prototype.isTokenExpired = function (token, offsetSeconds) {
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    JwtHelperService.prototype.b64decode = function (str) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
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
    JwtHelperService.prototype.b64DecodeUnicode = function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(""));
    };
    JwtHelperService = __decorate([
        Injectable()
    ], JwtHelperService);
    return JwtHelperService;
}());
export { JwtHelperService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWhlbHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvbG9nb24vand0LWhlbHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDOzs7Ozs7R0FNRztBQUVIO0lBQUE7SUE0R0EsQ0FBQztJQTFHUSwwQ0FBZSxHQUF0QixVQUF1QixHQUFXO1FBQ2hDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsUUFBUSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU07YUFDUDtZQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxJQUFJLElBQUksQ0FBQztnQkFDZixNQUFNO2FBQ1A7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxHQUFHLENBQUM7Z0JBQ2QsTUFBTTthQUNQO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sc0NBQVcsR0FBbEIsVUFBbUIsS0FBYTtRQUM5QixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQ7Z0JBQy9ELHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7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U0FBUyxDQUFDLEdBQUc7YUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFDLENBQU07WUFDaEMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ2hCLENBQUM7SUFDSixDQUFDO0lBMUdVLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0E0RzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTVHRCxJQTRHQztTQTVHWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqXG4gKiBKc29uV2ViVG9rZW4tSGFuZGxpbmdcbiAqXG4gKiBwYXlsb2FkZCBhdXMgZGVtIEpXVCBob2xlbi8gSldUIC1BYmxhdWYgdWViZXJwcnVlZmVuXG4gKlxuICogbGlmdGVkIGZyb20ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hdXRoMC9hbmd1bGFyMi1qd3R9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RIZWxwZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgdXJsQmFzZTY0RGVjb2RlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgb3V0cHV0ID0gc3RyLnJlcGxhY2UoLy0vZywgXCIrXCIpLnJlcGxhY2UoL18vZywgXCIvXCIpO1xuICAgIHN3aXRjaCAob3V0cHV0Lmxlbmd0aCAlIDQpIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMjoge1xuICAgICAgICBvdXRwdXQgKz0gXCI9PVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzoge1xuICAgICAgICBvdXRwdXQgKz0gXCI9XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGJhc2U2NHVybCBzdHJpbmchXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5iNjREZWNvZGVVbmljb2RlKG91dHB1dCk7XG4gIH1cblxuICBwdWJsaWMgZGVjb2RlVG9rZW4odG9rZW46IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdChcIi5cIik7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW5zcGVjdGVkIHRva2VuIGRvZXNuXFwndCBhcHBlYXIgdG8gYmUgYSBKV1QuIFwiICtcbiAgICAgICAgICBcIkNoZWNrIHRvIG1ha2Ugc3VyZSBpdCBoYXMgdGhyZWUgcGFydHMgYW5kIHNlZSBodHRwczovL2p3dC5pbyBmb3IgbW9yZS5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlZCA9IHRoaXMudXJsQmFzZTY0RGVjb2RlKHBhcnRzWzFdKTtcbiAgICBpZiAoIWRlY29kZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBkZWNvZGUgdGhlIHRva2VuLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkZWNvZGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25EYXRlKHRva2VuOiBzdHJpbmcpOiBEYXRlIHwgbnVsbCB7XG4gICAgbGV0IGRlY29kZWQ6IGFueTtcbiAgICBkZWNvZGVkID0gdGhpcy5kZWNvZGVUb2tlbih0b2tlbik7XG5cbiAgICBpZiAoIWRlY29kZWQuaGFzT3duUHJvcGVydHkoXCJleHBcIikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoZGVjb2RlZC5leHApO1xuXG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwdWJsaWMgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZywgb2Zmc2V0U2Vjb25kcz86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmdldFRva2VuRXhwaXJhdGlvbkRhdGUodG9rZW4pO1xuICAgIG9mZnNldFNlY29uZHMgPSBvZmZzZXRTZWNvbmRzIHx8IDA7XG5cbiAgICBpZiAoZGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhKGRhdGUudmFsdWVPZigpID4gbmV3IERhdGUoKS52YWx1ZU9mKCkgKyBvZmZzZXRTZWNvbmRzICogMTAwMCk7XG4gIH1cblxuICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tY29uZGl0aW9uYWwtYXNzaWdubWVudCBuby1iaXR3aXNlIGJhbi1jb21tYS1vcGVyYXRvciAqL1xuICAvLyBjcmVkaXRzIGZvciBkZWNvZGVyIGdvZXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2F0a1xuICBwcml2YXRlIGI2NGRlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7XG4gICAgbGV0IG91dHB1dDogc3RyaW5nID0gXCJcIjtcblxuICAgIHN0ciA9IFN0cmluZyhzdHIpLnJlcGxhY2UoLz0rJC8sIFwiXCIpO1xuXG4gICAgaWYgKHN0ci5sZW5ndGggJSA0ID09PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCInYXRvYicgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLlwiKTtcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlcnNcbiAgICAgICAgbGV0IGJjOiBudW1iZXIgPSAwLCBiczogYW55LCBidWZmZXI6IGFueSwgaWR4OiBudW1iZXIgPSAwO1xuICAgICAgICAvLyBnZXQgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgKGJ1ZmZlciA9IHN0ci5jaGFyQXQoaWR4KyspKTtcbiAgICAgICAgLy8gY2hhcmFjdGVyIGZvdW5kIGluIHRhYmxlPyBpbml0aWFsaXplIGJpdCBzdG9yYWdlIGFuZCBhZGQgaXRzIGFzY2lpIHZhbHVlO1xuICAgICAgICB+YnVmZmVyICYmXG4gICAgICAgIChcbiAgICAgICAgICAgIChicyA9IGJjICUgNCA/IGJzICogNjQgKyBidWZmZXIgOiBidWZmZXIpLFxuICAgICAgICAgICAgICAgIC8vIGFuZCBpZiBub3QgZmlyc3Qgb2YgZWFjaCA0IGNoYXJhY3RlcnMsXG4gICAgICAgICAgICAgICAgLy8gY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIG9uZSBhc2NpaSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIGJjKysgJSA0XG4gICAgICAgIClcbiAgICAgICAgICAgID8gKG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSAmIChicyA+PiAoKC0yICogYmMpICYgNikpKSlcbiAgICAgICAgICAgIDogMFxuICAgICkge1xuICAgICAgLy8gdHJ5IHRvIGZpbmQgY2hhcmFjdGVyIGluIHRhYmxlICgwLTYzLCBub3QgZm91bmQgPT4gLTEpXG4gICAgICBidWZmZXIgPSBjaGFycy5pbmRleE9mKGJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyOiBhbnkpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBBcnJheS5wcm90b3R5cGUubWFwXG4gICAgICAgICAgICAuY2FsbCh0aGlzLmI2NGRlY29kZShzdHIpLCAoYzogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBcIiVcIiArIChcIjAwXCIgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oXCJcIiksXG4gICAgKTtcbiAgfVxuXG59XG4iXX0=