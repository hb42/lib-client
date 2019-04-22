/**
 * JsonWebToken-Handling
 *
 * payloadd aus dem JWT holen/ JWT -Ablauf ueberpruefen
 *
 * lifted from {@link https://github.com/auth0/angular2-jwt}
 */
export declare class JwtHelperService {
    urlBase64Decode(str: string): string;
    decodeToken(token: string): any;
    getTokenExpirationDate(token: string): Date | null;
    isTokenExpired(token: string, offsetSeconds?: number): boolean;
    private b64decode;
    private b64DecodeUnicode;
}
