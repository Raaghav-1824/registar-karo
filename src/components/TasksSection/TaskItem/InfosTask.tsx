import React from "react";
import { Task } from "../../../interfaces";
import { ReactComponent as Calendar } from "../../../assets/date.svg";
import useDate from "../../hooks/useDate";
import { motion } from "framer-motion";

const InfosTask: React.FC<{ task: Task; isListInView1: boolean }> = ({
  task,
  isListInView1,
}) => {
  const dateFormated = useDate(task.date);

  return (
    
    <motion.div
    className={`flex flex-col flex-1 ${isListInView1 ? "mr-6" : ""}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div
      className={`flex items-center justify-between ${
        isListInView1 ? "mb-1" : "mb-2"
      }`}
    >
      <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
        {task.title}
      </span>
    </div>
    <p
      title={task.description}
      className={`description mb-3 text-base text-gray-600 dark:text-gray-300 ${
        isListInView1 ? "line-clamp-2 sm:line-clamp-1" : "line-clamp-3"
      }`}
    >
      {task.description}
    </p>
    <time className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Calendar className="mr-2 w-5 h-5 text-gray-600 dark:text-gray-400" />
      <span>{dateFormated}</span>
    </time>
  </motion.div>
    
  );
};

export default InfosTask;
