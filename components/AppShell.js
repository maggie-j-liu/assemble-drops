/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import ScreamGauge from "./ScreamGauge";
import RandomScreamGauge from "./RandomScreamGauge";
import Countdown  from "react-countdown";

import ReactTimeAgo from 'react-time-ago'
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppShell(props) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="absolute sm:static top-4 left-4 sm:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{props.title || "Assemble Drops"}</h1>
              <h2 className="text-xl text-neutral-200">Ends <ReactTimeAgo date={'2022-08-06T20:35:00'} locale="en-US" timeStyle="round" /></h2>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl pb-12 sm:px-6 lg:px-8">
            <div className="h-fit bg-white sm:px-6 sm:py-6 shadow rounded-md">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
