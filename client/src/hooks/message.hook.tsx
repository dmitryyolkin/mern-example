import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text) => {
    let _window = window as any;
    if (_window.M && text) {
      // send alert
      // https://materializecss.com/toasts.html
      _window.M.toast({ html: text });
    }
  }, []);
};
