import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tokenizer"
})
export class TokenizerPipe implements PipeTransform {
  transform(value: any, delimiter: string): any {
    value = value || ","; // set default delimiter to ','
    // split and join input using delimiter
    return value.split("").join(delimiter);
  }
}
