import React from "react";
import classNames from "classnames";

export default function ScreamGauge(props) {
  let displayValue = (props.value - 40) * 0.75;
  return (
    <div
      className={classNames(
        "flex h-64 w-full flex-col items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 sm:w-1/2"
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-center transition-all duration-75",
          {
            "bg-green-500 dark:bg-green-700": displayValue > 60,
            "bg-orange-500 dark:bg-orange-700":
              displayValue > 40 && displayValue <= 60,
            "bg-red-500 dark:bg-red-700":
              displayValue > 0 && displayValue <= 40,
          }
        )}
        style={{ height: Math.min(displayValue, 100) + "%", width: "100%" }}
      >
        <p className="animate-ping text-center text-3xl font-bold uppercase">
          {displayValue > 60 ? "Keep It Up" : "Make Some Noise"}
        </p>
      </div>
    </div>
  );
}
