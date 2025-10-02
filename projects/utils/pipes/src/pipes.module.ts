import { NgModule, PipeTransform, Type } from '@angular/core';

import { AffixPipe } from './affix.pipe';
import { ConditionPipe } from './condition.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { DefaultValuePipe } from './default-value.pipe';
import { DefinedPipe } from './defined.pipe';
import { EndsWithPipe } from './ends-with.pipe';
import { EqualPipe } from './equal.pipe';
import { ExcludePropertiesPipe } from './exclude-properties.pipe';
import { ExistPipe } from './exist.pipe';
import { FilterPipe } from './filter.pipe';
import { IncludesPipe } from './includes.pipe';
import { JsTypePipe } from './js-type.pipe';
import { MapPipe } from './map.pipe';
import { NotDefinedPipe } from './not-defined.pipe';
import { NotEqualPipe } from './not-equal.pipe';
import { NotExistPipe } from './not-exist.pipe';
import { NumberTransformPipe } from './number-transform.pipe';
import { PickPipe } from './pick.pipe';
import { PickMapPipe } from './pick-map.pipe';
import { PluckPipe } from './pluck.pipe';
import { RangePipe } from './range.pipe';
import { ReplacePipe } from './replace.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { SplitStringPipe } from './split-str.pipe';
import { StringLimitPipe } from './string-limit.pipe';
import { SymbolLimit } from './symbol-limit.pipe';
import { TagReplacerPipe } from './tag-replacer.pipe';
import { TypeParser } from './type-parser.pipe';

const imports: Type<PipeTransform>[] = [
  SplitStringPipe,
  SanitizerPipe,
  DefinedPipe,
  ConditionPipe,
  DefaultValuePipe,
  EqualPipe,
  NotEqualPipe,
  IncludesPipe,
  PickPipe,
  SymbolLimit,
  MapPipe,
  TypeParser,
  JsTypePipe,
  AffixPipe,
  ExcludePropertiesPipe,
  FilterPipe,
  PluckPipe,
  PickMapPipe,
  EndsWithPipe,
  NotDefinedPipe,
  ExistPipe,
  NotExistPipe,
  NumberTransformPipe,
  TagReplacerPipe,
  StringLimitPipe,
  CurrencySymbolPipe,
  ReplacePipe,
  RangePipe,
];

@NgModule({
  imports,
  exports: imports,
})
export class UtilsPipesModule {}
