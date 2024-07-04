"use client";
import React from "react";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Map"), { ssr: false });
const Logtrees = () => {
  return (
    <div>
      <div className="relative flex size-full min-h-screen flex-col   group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#111811] tracking-light text-[32px] font-bold leading-tight min-w-72">
                  Log Plant Location
                </p>
              </div>
              <h3 className="text-[#111811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Plant Information
              </h3>
              <div className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2">
                <img
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  src="https://cdn.usegalileo.ai/stability/28cec479-8dbd-46e2-8dd1-fd236f019047.png"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[#111811] text-base font-medium leading-normal line-clamp-1">
                    Swiss Cheese Plant
                  </p>
                  <p className="text-[#608562] text-sm font-normal leading-normal line-clamp-2">
                    Monstera deliciosa
                  </p>
                </div>
              </div>
              <h3 className="text-[#111811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
                Location
              </h3>
              <div className="">
                <Map />
              </div>
              <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111811] text-base font-medium leading-normal pb-2">
                    Latitude
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111811] focus:outline-0 focus:ring-0 border-none bg-[#eaf0ea] focus:border-none h-14 placeholder:text-[#608562] p-4 text-base font-normal leading-normal"
                    value=""
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-1 flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111811] text-base font-medium leading-normal pb-2">
                    Longitude
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111811] focus:outline-0 focus:ring-0 border-none bg-[#eaf0ea] focus:border-none h-14 placeholder:text-[#608562] p-4 text-base font-normal leading-normal"
                    value=""
                  />
                </label>
              </div>
              <div className="flex px-4 py-3">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#4cae4f] text-[#111811] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Save Location</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logtrees;
