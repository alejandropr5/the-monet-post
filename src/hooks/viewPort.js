"use client"
import React from "react";

export const useViewport = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, height };
}
