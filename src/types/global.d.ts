// src/types/global.d.ts

declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoad?: ()=> void;
  }
}

export {};
