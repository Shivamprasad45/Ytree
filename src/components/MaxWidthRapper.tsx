import React from "react";
import { cn } from "../lib/utils";

const MaxWidthRappers = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto    overflow-hidden ", className)}>
      {children}
    </div>
  );
};

export default MaxWidthRappers;
