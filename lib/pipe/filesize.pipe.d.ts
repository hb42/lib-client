import { PipeTransform } from "@angular/core";
export declare class FileSizePipe implements PipeTransform {
    private readonly suffix;
    constructor();
    transform(value: any): any;
    private conv;
}
