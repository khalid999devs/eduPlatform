import { useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const [isAdmin] = useOutletContext();
  if (isAdmin)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-3xl text-darkText">This is admin dashboard</h2>
      </div>
    );
};

export default AdminDashboard;
