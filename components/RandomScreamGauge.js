import React from "react";
import ScreamGauge from "./ScreamGauge";
import { useState, useEffect } from "react";

export default function RandomScreamGauge() {
  const [value, setValue] = useState(Math.random() * 100);

  useEffect(() => {
    const interval = setInterval(() => setValue(Math.random() * 100), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <ScreamGauge value={value} />;
}
