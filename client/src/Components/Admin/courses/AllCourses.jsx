import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { fetchCourses, deleteCourse } from "../../../axios/global";
import { MdSearch } from "react-icons/md";
function AllCourse() {
  const [data, setData] = useState([{}]);
  const [search, setSrc] = useState("");
  const [isAdmin] = useOutletContext();
  useEffect(() => {
    fetchCourses(setData);
  }, []);
  if (isAdmin)
    return (
      <div className="w-full h-5/6 overflow-y-hidden p-5 mt-20">
        <hr />
        <div className="flex justify-center flex-auto overflow-y-scroll w-full max-w-6xl mx-auto h-72 gap-1 items-start my-4 p-2">
          <table className="w-full bg-slate-300 text-darkText shadow-md cursor-default select-none">
            {/* title bar */}
            <thead className="sticky top-0 left-0">
              <tr className="w-full bg-slate-700 text-white">
                <th className="p-1">Sl No.</th>
                <th className="tracking-normal capitalize text-sm px-10 py-2  text-center ">
                  Course Name
                </th>
                <th className={` text-sm px-10 py-2 text-center`}>
                  Price (BDT)
                </th>
                <th className=" text-sm px-10 py-2 text-center">Controls</th>
              </tr>
            </thead>
            <tbody className="h-auto bg-red-50 overflow-y-scroll">
              {data?.map((val, id) => {
                if (search.length > 0) {
                  if (val.title?.toLowerCase().includes(search?.toLowerCase()))
                    return (
                      <Coursecard
                        found={true}
                        key={id}
                        allData={val}
                        id={val.id}
                        sl={id}
                      />
                    );
                } else
                  return (
                    <Coursecard
                      found={false}
                      key={id}
                      allData={val}
                      id={val.id}
                      sl={id}
                    />
                  );
              })}
            </tbody>
          </table>
          <section className="sticky top-0 right-0 ring-1 ring-slate-800 shadow-lg shadow-slate-600/20 text-sm w-fit p-2 rounded-md mb-10 flex ">
            <input
              name="titleSrc"
              id="titleSrc"
              className="border-0 outline-none"
              type="text"
              placeholder="Enter Course Name"
              onChange={(e) => setSrc(e.target.value)}
            />
            <label className=" px-4 py-2 rounded-md" htmlFor="titleSrc">
              <MdSearch />
            </label>
          </section>
        </div>
        <hr />
        <Outlet />
      </div>
    );
}
const Coursecard = ({ allData, id, sl, found }) => {
  return (
    <tr
      key={`${id}&+${sl}`}
      className={`${sl % 2 ? "bg-gray-200" : "bg-slate-300"} 
       min-w-max w-full row-span-2`}
    >
      <td className=" text-center">{sl + 1}</td>
      <td
        className={`font-semibold tracking-normal capitalize text-sm text-left px-10 py-2 ${
          found ? "border border-red-500" : ""
        } `}
      >
        {allData.title} (cid:{allData.id})
      </td>
      <td
        className={`font-semibold tracking-normal capitalize text-sm text-left px-10 py-2 `}
      >
        {allData.price}
      </td>
      <td className="grid grid-cols-3 justify-center items-center font-semibold capitalize text-sm px-10 py-2 border-l-orange-700 border-2 border-transparent ">
        <Link to={`${id}`}>
          <button className="bg-green-500 rounded-md text-white capitalize px-3 py-1">
            visit
          </button>
        </Link>
        <Link to={`../chat/${id}`}>
          <button className="bg-yellow-300 rounded-md text-black capitalize px-3 py-1">
            Chat
          </button>
        </Link>
        <button
          className="bg-red-500 rounded-md text-white capitalize px-3 py-1 mx-auto"
          onClick={() => {
            if (
              prompt(
                "Do you want to delete this course? [y/n]"
              ).toLowerCase() == "y"
            )
              deleteCourse(id, allData.title);
            else alert("Cancel deletation");
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AllCourse;
