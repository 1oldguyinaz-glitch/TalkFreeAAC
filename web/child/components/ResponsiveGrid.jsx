import React, { useEffect, useMemo, useState } from "react";
import { getAdaptiveStyle } from "../../../engine/display/layoutEngine.js";

export default function ResponsiveGrid({ children, className = "", role = "list" }) {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800
  });

  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const style = useMemo(() => getAdaptiveStyle(size.width, size.height), [size]);

  return (
    <section className={`responsiveAACGrid ${className}`} style={style} role={role}>
      {children}
    </section>
  );
}
