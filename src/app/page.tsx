"use client";

import Homes from "./pages/Home";
import GoogleAds from "./Components/Home/GoogleAds";
import GoogleAd from "./Components/GoogleAd";

export default function Home() {
  return (
    <>
      <div className="">
        <Homes />
        <div className="container mx-auto px-4">
          <GoogleAds />
          <GoogleAd slotId="8932948273" />
        </div>
      </div>
    </>
  );
}
