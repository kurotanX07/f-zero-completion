declare module 'i18n-js' {
  export class I18n {
    constructor(translations: Record<string, any>);
    t(scope: string, options?: Record<string, any>): string;
    locale: string;
    defaultLocale: string;
    enableFallback: boolean;
  }
} 