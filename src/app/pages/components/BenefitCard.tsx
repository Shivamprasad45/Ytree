import React from "react";
import { motion } from "framer-motion";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default BenefitCard;
