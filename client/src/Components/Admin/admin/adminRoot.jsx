
import Card from "./card";

//root layout of admin panel
const AdminRoot = () => {


  return (
    <div className="bg-transparent p-5 rounded-lg flex justify-between items-start relative h-screen overflow-y-hidden bg-slate-100">

    </div>
  );
};

export default AdminRoot;
//extra components


const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {data.map((val, id) => {
          return (
            <Card
              key={id}
              color={val.color}
              title={val.title}
              taka={val.taka}
              per={val.per}
              perExtra={val.perExtra}
            />
          );
        })}
      </div>
    </>
  );
};

const data = [
  // card -1
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-purple-500 to-purple-200",
  },
  // card -2
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-orange-500 to-orange-200",
  },
  // card -3
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-red-500 to-red-200",
  },
  // card -4
  {
    title: "Sales",
    taka: "$103,430",
    per: " +5%",
    perExtra: "than last month",
    color: "from-sky-500 to-sky-200",
  },
];
