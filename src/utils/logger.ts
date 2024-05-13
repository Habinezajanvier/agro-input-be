import fs from "fs";
import path from "path";

export class Logger {
  public logStream: fs.WriteStream;

  constructor() {
    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];

    const logFile = path.join(process.cwd(), "logs");
    this.logStream = fs.createWriteStream(
      path.join(logFile, `${year}-${month + 1}-${day}.log`),
      { flags: "a" }
    );
  }

  log = (log: string): void => {
    const date = new Date();
    const logString = date.toLocaleTimeString() + " : Log " + log + "\n";
    this.logStream.write(logString);
  };

  warn = (log: string): void => {
    const date = new Date();
    const logString = date.toLocaleTimeString() + " : Warn " + log + "\n";
    this.logStream.write(logString);
  };

  error = (log: string): void => {
    const date = new Date();
    const logString = date.toLocaleTimeString() + " : Error " + log + "\n";
    this.logStream.write(logString);
  };
}
