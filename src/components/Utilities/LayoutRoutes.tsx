import React, { useState, useCallback } from "react";
import { Task } from "../../interfaces";
import { useAppDispatch } from "../../store/hooks";
import { modalActions } from "../../store/Modal.store";
import useSortTasks from "../hooks/useSortTasks";
import ButtonsSort from "../TasksSection/ButtonsSort";
import TaskItem from "../TasksSection/TaskItem/TaskItem";
import { motion } from "framer-motion"; // Framer motion for animations

interface LayoutRoutesProps {
  title: string;
  tasks: Task[];
}

const LayoutRoutes: React.FC<LayoutRoutesProps> = ({ title, tasks }) => {
  const [isListInView1, setIsListInView1] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { sortedBy, setSortedBy, sortedTasks } = useSortTasks(tasks);

  // useCallback to memoize modal open handler
  const openModalHandler = useCallback(() => {
    dispatch(modalActions.openModalCreateTask());
  }, [dispatch]);

  const tasksTitle = `${title} (${tasks.length} ${tasks.length === 1 ? "task" : "tasks"})`;

  return (
    <section className="fade-in">
      <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
        {tasksTitle}
      </h1>
      
      <ButtonsSort
        isListInView1={isListInView1}
        setIsListInView1={setIsListInView1}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
      />
      
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`tasksList mt-4 grid gap-2 sm:gap-4 xl:gap-6 ${
          isListInView1
            ? "grid-cols-1"
            : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
        } transition-all duration-300 ease-in-out`}
      >
        {sortedTasks.map((task) => (
          <motion.li
            key={task.id}
            className="task-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem isListInView1={isListInView1} task={task} />
          </motion.li>
        ))}
        
        <motion.li
          className="task-item add-task"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button
            onClick={openModalHandler}
            className={`border-2 border-slate-300 text-slate-400 w-full rounded-lg border-dashed transition-colors duration-300 hover:bg-slate-300 hover:text-slate-500 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
              isListInView1 ? "h-20 sm:h-32" : "h-52 sm:h-64"
            }`}
          >
            Add new task
          </button>
        </motion.li>
      </motion.ul>
    </section>
  );
};

export default React.memo(LayoutRoutes);
