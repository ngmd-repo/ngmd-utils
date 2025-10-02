import { EnLogLevel } from '../enums/logger.enums';

export class ErrorMessage {
  public level: EnLogLevel = EnLogLevel.ERROR;
  public timestamp: string = new Date().toJSON();
  public message: string = null;

  constructor(message: unknown) {
    const isExistStack: boolean = 'stack' in (message as Error);

    this.message = isExistStack ? String((message as Error).stack) : JSON.stringify(message);
  }
}
