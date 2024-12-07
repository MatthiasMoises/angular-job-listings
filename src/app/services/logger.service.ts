import { Injectable } from '@angular/core';

export enum LogLevel {
  INFO = 0,
  WARN = 1,
  ERROR = 2
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  writeToLog(msg: string, logLevel: LogLevel) {
    const output: string = new Date() + ": " + JSON.stringify(msg);

    switch (logLevel) {
      case LogLevel.INFO:
        console.log(output);
        break;
      case LogLevel.WARN:
        console.warn(output)
        break;
      case LogLevel.ERROR:
        console.error(output);
        break;
      default:
        console.log(output);
    }
  }
}
