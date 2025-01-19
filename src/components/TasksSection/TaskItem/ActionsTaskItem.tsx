import React from "react";
import { motion } from "framer-motion";
import { Task } from "../../../interfaces";
import BtnEditTask from "./BtnEditTask";
import BtnMarkAsImportant from "./BtnMarkAsImportant";
import BtnDeleteTask from "./BtnDeleteTask";
import BtnToggleCompleted from "./BtnToggleCompleted";

const ActionsTaskItem: React.FC<{ task: Task; isListInView1: boolean }> = ({
  task,
  isListInView1,
}) => {
  return (
    
    <motion.div
      className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] ${
        isListInView1 ? "items-center" : "border-t-2 w-full pt-4 mt-4"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="mr-2"
      >
        <BtnToggleCompleted
          taskCompleted={task.completed}
          taskId={task.id}
          isListInView1={isListInView1}
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="mr-2"
      >
        <BtnMarkAsImportant taskId={task.id} taskImportant={task.important} />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="mr-2"
      >
        <BtnDeleteTask taskId={task.id} />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="mr-2"
      >
        <BtnEditTask task={task} />
      </motion.div>
    </motion.div>
  );
};

export default ActionsTaskItem;
