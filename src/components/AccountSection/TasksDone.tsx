import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTasks";
import useTodayTasks from "../hooks/useTodayTasks";
import { motion } from "framer-motion";

const TasksDone: React.FC = () => {
  const todaysTasks = useTodayTasks();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const { tasks: todayTasksDone } = useCompletedTasks({
    tasks: todaysTasks,
    done: true,
  });
  const { tasks: allTasksDone } = useCompletedTasks({
    tasks: tasks,
    done: true,
  });

  const percentageTodayTasks =
    (todayTasksDone.length * 100) / todaysTasks.length;

  const percentageAllTasks = (allTasksDone.length * 100) / tasks.length;

  const todaysTasksToShow = todaysTasks.slice(0, 3);
  const showMore = todaysTasks.length > todaysTasksToShow.length;

  return (
    <>
      {todaysTasks.length !== 0 && (
        <div className="mt-8">
          <motion.span
            className="flex justify-between mb-2 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>Tasks today</span> {todayTasksDone.length}/
            {todaysTasks.length}
          </motion.span>
          <div className="barProgress relative w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              style={{ width: `${percentageTodayTasks}%` }}
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentageTodayTasks}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
      )}

      {tasks.length !== 0 && (
        <div className="mt-6">
          <motion.span
            className="flex justify-between mb-2 text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>All tasks</span> {allTasksDone.length}/{tasks.length}
          </motion.span>
          <div className="barProgress relative w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              style={{ width: `${percentageAllTasks}%` }}
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentageAllTasks}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>
      )}

      {todaysTasks.length === 0 && (
        <span className="mt-6 block pt-4 border-t-2 border-t-slate-200 dark:border-t-slate-700/[.3] text-gray-500 dark:text-gray-400">
          No tasks today
        </span>
      )}

      {todaysTasks.length > 0 && (
        <div className="mt-8">
          <motion.span
            className="mb-2 block text-xl font-semibold text-gray-800 dark:text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Today's tasks
          </motion.span>
          <ul>
            {todaysTasksToShow.map((task) => (
              <li
                key={task.id}
                className="py-2 pl-6 text-slate-200 list-item transition duration-300 hover:text-blue-500 dark:hover:text-blue-300"
              >
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
          {showMore && (
            <Link
              to="/today"
              className="pl-6 text-sm text-blue-500 dark:text-blue-300 hover:underline"
            >
              Show more
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(TasksDone);
