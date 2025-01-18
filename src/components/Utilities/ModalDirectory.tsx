import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Modal from "./Modal";

const ModalDirectory: React.FC<{
  onClose: () => void;
  dirName?: string;
  onConfirm: (newDirName: string) => void;
  btnText: string;
  title: string;
}> = ({ onClose, dirName, onConfirm, btnText, title }) => {
  // Defining directories as string array
  const directories = useAppSelector((store) => store.tasks.directories);

  const [errorDirectoryName, setErrorDirectoryName] = useState<boolean>(false);
  const [newDirName, setNewDirName] = useState<string>(dirName || "");

  const checkDirNameExists = (val: string) => {
    const directoryDoesNotExist = directories.every(
      (dir: string) => dir !== val // Explicitly typing 'dir' as string
    );

    if (directoryDoesNotExist || dirName === val) {
      setErrorDirectoryName(false);
    } else {
      setErrorDirectoryName(true);
    }
  };

  const confirmDirNameHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (errorDirectoryName) return;
    onConfirm(newDirName);
    onClose();
  };

  return (
    <Modal onClose={onClose} title={title}>
      <form className="flex flex-col gap-4">
        <div className="relative">
          <label htmlFor="dir-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Directory Name
          </label>
          <input
            type="text"
            id="dir-name"
            placeholder="Enter a directory name"
            value={newDirName}
            onChange={({ target }) => setNewDirName(target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            onInput={({ currentTarget }) => checkDirNameExists(currentTarget.value)}
          />
          {errorDirectoryName && (
            <div className="absolute bg-blue-500 text-white rounded-md p-2 top-full left-0 mt-1 text-sm font-medium w-full z-20">
              Directory name already exists
            </div>
          )}
        </div>

        <button
          type="button"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={confirmDirNameHandler}
        >
          {btnText}
        </button>
      </form>
    </Modal>
  );
};

export default ModalDirectory;
