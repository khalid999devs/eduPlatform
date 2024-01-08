import { MdSearch } from "react-icons/md"; 
import { useState } from "react";
function Stundet() {
  const [phone, setPhone] = useState("");
  return (
    <>
      <div className="px-5 flex flex-col h-full">
        <h2 className="text-center text-darkText text-4xl font-semibold mb-10">
          Student page
        </h2>
        {/* serach box */}
        <div className="flex justify-between items-center">
          {/* footer */}
          <form
            className="flex items-center justify-center p-10 w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <section className="flex items-center justify-between rounded-md ring ring-gray-600/50 p-2 mx-4">
              <input
                className="bg-transparent outline-none border-none dark:text-darkText"
                placeholder="Search phone..."
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
              <MdSearch className="inline-block text-3xl text-gray-600/70 " />
            </section>
          </form> 
        </div>
        {/* sutdent lists */}
        <div className="flex justify-center flex-auto overflow-y-scroll max-w-6xl w-full mx-auto border border-root_bluish">
          <table className="w-full bg-slate-300 text-darkText shadow-md cursor-default select-text">
            <thead className="w-full">
              <tr className="text-darkText text-lg text-left">
                <th className="sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-4 bg-gray-100 text-center">
                  Sl No.
                </th>
                <th className="sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100">
                  Name
                </th>
                <th className="sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100">
                  Email
                </th>
                <th className="sticky top-0 left-0  shadow-root_bluish/20 shadow-lg  py-2 px-10 bg-gray-100">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-64 ">
              {studentData
                .filter((val) => val.phone.includes(phone))
                .map((student, id) => {
                  return (
                    <StudentList
                      id={id}
                      key={id}
                      name={student.name}
                      avatar={student.avatar}
                      email={student.email}
                      phone={student.phone}
                    />
                  );
                })}

              {/* <!-- Add more rows for additional students --> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Stundet;
const StudentList = ({ id, avatar, name, email, phone }) => {
  return (
    <tr
      key={id}
      className={`hover:bg-gray-500/20 transition-colors duration-100 ease-in border-b ${id != studentData.length - 1
        ? " border-root_bluish"
        : "border-transparent"
        }`}
    >
      <td className="py-2 text-center">{id + 1}</td>
      <td className="py-2 text-center flex items-center gap-0 font-semibold my-auto">
        {avatar && (
          <img
            className="w-10 h-10 rounded-full object-cover select-none"
            src={avatar}
            alt="Avatar"
            width={100}
            height={100}
          />
        )}
        <p className="text-left pl-2">{name}</p>
      </td>
      <td className="py-2 text-left">{email}</td>
      <td className="p-2 text-justify">{phone}</td>
    </tr>
  );
};
const studentData = [
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801561691229",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801464894449",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801561691229",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801464894449",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801464894449",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801464894449",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "+8801561691119",
    avatar: "/avatar.jpg",
  },
  {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "+8801464894449",
    avatar: "/avatar.jpg",
  },
];
