import React from "react";
let classNames = require("classnames");

export default function ScreamGauge(props) {
  return (
    <div
      className={classNames(
        "flex h-96 w-1/2 flex-col items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700"
      )}
    >
      <div
        className={classNames("transition-all duration-75", {
          "bg-green-500 dark:bg-green-700": props.value > 80,
          "bg-yellow-500 dark:bg-yellow-700":
            props.value > 50 && props.value <= 80,
          "bg-orange-500 dark:bg-orange-700":
            props.value > 0 && props.value <= 50,
        })}
        style={{ height: Math.min(props.value, 100) + "%", width: "100%" }}
      />
    </div>
  );
}
