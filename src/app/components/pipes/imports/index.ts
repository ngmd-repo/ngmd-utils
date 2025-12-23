import { JsonPipe } from '@angular/common';
import { Type } from '@angular/core';
import {
  ExcludePropertiesPipe,
  IncludesPipe,
  MapPipe,
  NumberTransformPipe,
  PickMapPipe,
  PickPipe,
  PluckPipe,
  ReplacePipe,
  SanitizerPipe,
  SplitStringPipe,
  SymbolLimit,
  TagReplacerPipe,
} from '@ngmd/utils/pipes';

export const PipesImports: Type<unknown>[] = [
  ExcludePropertiesPipe,
  IncludesPipe,
  MapPipe,
  NumberTransformPipe,
  PickMapPipe,
  PickPipe,
  PluckPipe,
  ReplacePipe,
  SanitizerPipe,
  SplitStringPipe,
  SymbolLimit,
  TagReplacerPipe,
  JsonPipe,
];
