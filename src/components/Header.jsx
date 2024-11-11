import React, { memo } from "react";
import classNames from "classnames";
import { FaSpaceShuttle } from "react-icons/fa";

export const Header = memo(({ activePage, setActivePage }) => {
  const getButtonClass = (page) =>
    classNames("w-32 h-10 duration-200", {
      "font-semibold bg-neutral-200/40": activePage === page,
      "font-medium": activePage !== page,
    });

  return (
    <div className="w-full fixed bg-black/80 drop-shadow-md backdrop-blur-md z-50 flex flex-col justify-between items-center select-none">
      <div className="w-full flex flex-col justify-center items-center py-4">
        <h1 className="text-3xl font-extrabold uppercase flex justify-center items-center gap-2 text-neutral-200">
          <span className="-rotate-90">
            <FaSpaceShuttle />
          </span>
          Space Rise
        </h1>
      </div>
      <div className="w-full flex justify-center items-center bg-black/80 text-neutral-200">
        <button
          onClick={() => setActivePage("articles")}
          className={getButtonClass("articles")}
        >
          Articles
        </button>
        <button
          onClick={() => setActivePage("blogs")}
          className={getButtonClass("blogs")}
        >
          Blogs
        </button>
        <button
          onClick={() => setActivePage("reports")}
          className={getButtonClass("reports")}
        >
          Reports
        </button>
      </div>
    </div>
  );
});
