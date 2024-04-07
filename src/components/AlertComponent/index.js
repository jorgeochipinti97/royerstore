"use client";
import React, { useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AlertComponent = ({ title, body, icon }) => {





  return (
    <Alert
      style={{ opacity: 0 }}
      className="alerta absolute bottom-2 right-2 w-fit p-5"
    >
      {icon && icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{body}</AlertDescription>
    </Alert>
  );
};

