/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import ScreamGauge from "./ScreamGauge";
import RandomScreamGauge from "./RandomScreamGauge";

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
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">Assemble Drops</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="h-fit rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
