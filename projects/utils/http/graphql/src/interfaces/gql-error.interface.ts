/* eslint-disable @typescript-eslint/naming-convention */
export interface IGqlError {
  message: string;
  locations: GqlLocation[];
  path: string[];
  extensions: GqlExtension[];
}

export type GqlLocation = {
  line: number;
  column: number;
};

export type GqlExtension = {
  code: string;
  stacktrace: string[];
};
