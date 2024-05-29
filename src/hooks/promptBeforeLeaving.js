import { useState, useEffect } from "react";
export const promptOnLeaving = (message) => {
    useEffect(() => {
        // TODO: Make this work for route change as well
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = message; // Standard for most browsers
        return message; // For some browsers
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [message]);
};
  