import React from "react";
import { AscendingOrder, DescendingOrder} from '../assets/icons'

const HeaderBar = ({sorting, setSorting}) => {

  // handle sortBy change (userName, name, email)
  const handleSortByChange = (columnName) => {
    setSorting({
      ...sorting,
      sortBy: columnName
    });
  };

  // handle order change (asc, desc)
  const handleOrderChange = (columnName, order) => {
    setSorting({
      sortBy: columnName,
      order: order
    });
  };

  return (
    <div className="mx-10 bg-green-300 py-3 rounded-md">
      <div className="flex w-[60%] ml-[15%] gap-40 text-green-950">
        <div className="flex gap-3 items-center">
          <span className={`cursor-pointer ${sorting.sortBy === "userName" ? "font-bold" : "font-semibold"}`} onClick={() => handleSortByChange("userName")}>Username</span>
          <div className="flex flex-col">
            <AscendingOrder sorting={sorting} handler={handleOrderChange} columnName={"userName"}/>
            <DescendingOrder sorting={sorting} handler={handleOrderChange} columnName={"userName"}/>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className={`cursor-pointer ${sorting.sortBy === "name" ? "font-bold" : "font-semibold"}`} onClick={() => handleSortByChange("name")}>Customer Name</span>
          <div className="flex flex-col">
            <AscendingOrder sorting={sorting} handler={handleOrderChange} columnName={"name"}/>
            <DescendingOrder sorting={sorting} handler={handleOrderChange} columnName={"name"}/>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className={`cursor-pointer ${sorting.sortBy === "email" ? "font-bold" : "font-semibold"}`} onClick={() => handleSortByChange("email")}>Email</span>
          <div className="flex flex-col">
            <AscendingOrder sorting={sorting} handler={handleOrderChange} columnName={"email"}/>
            <DescendingOrder sorting={sorting} handler={handleOrderChange} columnName={"email"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
