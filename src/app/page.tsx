"use client";

import Homes from "./pages/Home";
import GoogleAds from "./Components/Home/GoogleAds";

export default function Home() {
  return (
    <>
      <div className="">
        <Homes />
        <div className="container mx-auto px-4">
          <GoogleAds />
        </div>
      </div>
    </>
  );
}
