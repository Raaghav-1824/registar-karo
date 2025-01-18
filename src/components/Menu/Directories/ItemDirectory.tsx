import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import { ReactComponent as Edit } from "../../../assets/edit.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";
import ModalDirectory from "../../Utilities/ModalDirectory";

const ItemDirectory: React.FC<{ dir: string; classActive: string }> = ({
  dir,
  classActive,
}) => {
  const route = useLocation();
  const currentPath = route.pathname;

  const dispatch = useAppDispatch();

  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

  const closeModalDirectoryHandler = () => {
    setModalDirIsShown(false);
  };

  const deleteDirectoryHandler = () => {
    dispatch(tasksActions.deleteDirectory(dir));
  };

  const confirmEditDirNameHandler = (dirName: string) => {
    dispatch(
      tasksActions.editDirectoryName({
        previousDirName: dir,
        newDirName: dirName,
      })
    );
  };

  return (
    <>
      {modalDirIsShown && (
        <ModalDirectory
          onClose={closeModalDirectoryHandler}
          onConfirm={confirmEditDirNameHandler}
          dirName={dir}
          title="Edit directory name"
          btnText="Edit"
        />
      )}
      {modalIsShown && (
        <ModalConfirm
          onClose={() => setModalIsShown(false)}
          onConfirm={deleteDirectoryHandler}
          text="This directory and all its tasks will be deleted."
        />
      )}
      <li
        className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${
          currentPath === "/dir/" + dir ? classActive : ""
        }`}
      >
        <NavLink
          to={`/dir/${dir}`}
          title={dir}
          className="hover:text-cyan-600 dark:hover:text-cyan-300 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
        >
          {dir}
        </NavLink>

        {dir !== "Main" && (
          <div className="ml-auto buttonsDir">
            <button
              title="edit directory name"
              onClick={() => setModalDirIsShown(true)}
            >
              <Edit className="w-5 h-5 mr-2 fill-cyan-600 hover:fill-cyan-800 dark:fill-cyan-300 dark:hover:fill-cyan-400 transition" />
            </button>
            <button
              title="delete directory"
              onClick={() => setModalIsShown(true)}
            >
              <Trash className="w-5 h-5 fill-blue-600 hover:fill-blue-800 dark:blue-red-400 dark:hover:fill-blue-500 transition" />
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default ItemDirectory;
