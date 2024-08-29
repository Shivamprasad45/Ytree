import { Loader } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const Loading = () => {
  return (
    <motion.div
      animate={{
        scale: 2, // increase the scale to make it bigger
        rotate: 360,
      }}
      transition={{
        duration: 4, // increase the duration to make the animation slower
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex justify-center  items-center h-screen"
    >
      <Loader />
    </motion.div>
  );
};

export default Loading;
