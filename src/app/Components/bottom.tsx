"use client";
import { LogOut, TreePalm, User2 } from "lucide-react";
import React from "react";

const Bottom = () => {
  return (
    <div>
      <div className="mb-1 md:hidden fixed bottom-0 w-full bg-white z-10">
        <div className="flex justify-between p-4">
          <User2 size={30} />
          <TreePalm size={30} />
          <LogOut size={30} />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
