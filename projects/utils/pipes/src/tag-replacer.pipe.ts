import { Pipe, PipeTransform } from '@angular/core';
import { replaceTags } from '@ngmd/utils/handlers';
import { TagsMap } from '@ngmd/utils/types';

@Pipe({
  name: 'tagReplacer',
})
export class TagReplacerPipe implements PipeTransform {
  public transform(value: string, tagsObj: TagsMap): string {
    return replaceTags(value, tagsObj);
  }
}
