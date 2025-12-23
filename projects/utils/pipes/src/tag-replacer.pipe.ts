import { Pipe, PipeTransform } from '@angular/core';
import { isNullish, replaceTags } from '@ngmd/utils/handlers';
import { TagsMap } from '@ngmd/utils/types';

@Pipe({
  name: 'tagReplacer',
})
export class TagReplacerPipe implements PipeTransform {
  public transform(value: string, tagsObj: TagsMap): string {
    if (isNullish(value)) return null;

    return replaceTags(value, tagsObj);
  }
}
