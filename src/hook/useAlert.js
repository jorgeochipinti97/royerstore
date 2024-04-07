// useAlert.js
import gsap, { Power1 } from "gsap";
import { useState } from "react";

export const useAlert = () => {
  const [alertProps, setAlertProps] = useState({
    title: "",
    body: "",
    icon: <></>,
  });

  const showAlert = (title, body, icon) => {
    setAlertProps({
      title,
      body,
      icon,
    });
    gsap.to(".alerta", { opacity: 1, duration: 0.5, delay: 0.2 });

    setTimeout(() => {
      gsap.to(".alerta", {
        opacity: 0,
        duration: 0.2,
        ease: Power1.easeIn,
      });
    }, 2500);
  };

  return {
    alertProps,
    showAlert,
  };
};
