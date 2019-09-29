import { Pipe, PipeTransform } from "@angular/core";

// Pipe Decorator
@Pipe({
  name: "tokenizer"
})
// Pipe Classs
export class TokenizerPipe implements PipeTransform {
  // transform function :
  // value : input String
  // delimiter : additional arguments to the pipe
  transform(value: any, delimiter: string): any {
    // set default delimiter to ',', if its empty
    value = value || ",";
    // split and join input using delimiter
    return value.split("").join(delimiter);
  }
}
