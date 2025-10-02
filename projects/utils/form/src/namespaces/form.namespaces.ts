export namespace NSFormPattern {
  export function get(type: string): RegExp {
    switch (type) {
      case 'email': {
        return new RegExp(
          /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      }

      case 'http': {
        return new RegExp(/^(https?:\/\/)?([a-z0-9-]+[.]{1}){1,3}\w{2,10}$/i);
      }

      // TODO решить что нам нужно

      case 'sortRouting': {
        return new RegExp(/^\d{14}$/);
      }

      case 'iban': {
        return new RegExp(/^[A-Z]{2}\d{2}\d{4}\d{4}\d{4}\d{4}[\d]{0,2}$/i);
      }

      case 'swift': {
        return new RegExp(/^[A-Z]{4}([A-Z]{2}){2}[0-9]{3}$/i);
      }

      default:
        throw new Error(`Invalid pattern type: "${type}"`);
    }
  }
}
