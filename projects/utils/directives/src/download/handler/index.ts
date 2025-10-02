import { isNullish } from '@ngmd/utils/handlers';

export function filename(url: string): string {
  return isNullish(url) ? url : url.split('/').pop();
}
