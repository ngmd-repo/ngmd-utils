import { HttpContextToken } from '@angular/common/http';

export const SKIP_REQUEST_MODIFICATION = new HttpContextToken(() => false);
export const SKIP_HEADERS_MODIFICATION = new HttpContextToken<boolean>(() => false);
