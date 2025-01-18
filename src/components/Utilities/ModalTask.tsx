import React, { useRef, useState } from "react";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

const InputCheckbox: React.FC<{
  label: string;
  isChecked: boolean;
  setChecked: (value: React.SetStateAction<boolean>) => void;
}> = ({ isChecked, setChecked, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        className={`w-5 h-5 rounded-full border grid place-items-center transition ${
          isChecked
            ? "bg-teal-500 border-teal-500"
            : "bg-gray-300 border-gray-400"
        }`}
      >
        {isChecked && <span className="w-2 h-2 bg-white rounded-full"></span>}
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev: boolean) => !prev)}
      />
    </label>
  );
};

const ModalCreateTask: React.FC<{
  onClose: () => void;
  task?: Task;
  nameForm: string;
  onConfirm: (task: Task) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {
  const directories = useAppSelector((state) => state.tasks.directories);

  const today: Date = new Date();
  const formattedDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const todayDate: string = formattedDate(today);
  const maxDate: string = formattedDate(
    new Date(today.setFullYear(today.getFullYear() + 1))
  );

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [date, setDate] = useState(task?.date || todayDate);
  const [isImportant, setIsImportant] = useState(task?.important || false);
  const [isCompleted, setIsCompleted] = useState(task?.completed || false);
  const [selectedDirectory, setSelectedDirectory] = useState(
    task?.dir || directories[0]
  );

  const isTitleValid = useRef<Boolean>(true);
  const isDateValid = useRef<Boolean>(true);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    isTitleValid.current = title.trim().length > 0;
    isDateValid.current = date.trim().length > 0;

    if (isTitleValid.current && isDateValid.current) {
      const newTask: Task = {
        title,
        dir: selectedDirectory,
        description,
        date,
        completed: isCompleted,
        important: isImportant,
        id: task?.id || Date.now().toString(),
      };
      onConfirm(newTask);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title={nameForm}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Title</span>
          <input
            type="text"
            placeholder="e.g., Study for the test"
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Date</span>
          <input
            type="date"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
            min={todayDate}
            max={maxDate}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">
            Description (optional)
          </span>
          <textarea
            placeholder="e.g., Study for the test"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          ></textarea>
        </label>
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Select a Directory</span>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            value={selectedDirectory}
            onChange={({ target }) => setSelectedDirectory(target.value)}
          >
            {directories.map((dir: string) => (
              <option key={dir} value={dir}>
                {dir}
              </option>
            ))}
          </select>
        </label>
        <InputCheckbox
          isChecked={isImportant}
          setChecked={setIsImportant}
          label="Mark as important"
        />
        <InputCheckbox
          isChecked={isCompleted}
          setChecked={setIsCompleted}
          label="Mark as completed"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-500"
        >
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
