import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      // send alert
      // https://materializecss.com/toasts.html
      window.M.toast({ html: text });
    }
  }, []);
};
