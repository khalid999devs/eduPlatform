import { Link, Outlet, useOutletContext } from "react-router-dom";
const Gallery = () => {
  const [isAdmin] = useOutletContext();

  return (
    <>
      <ul className="flex my-10 mx-auto w-fit justify-center items-center hap-5 gap-5">
        <Link
          className="px-5 py-2 text-center bg-blue-300 hover:bg-blue-400"
          to={"add-image"}
        >
          Add Image
        </Link>
        <Link
          className="px-5 py-2 text-center bg-blue-300 hover:bg-blue-400"
          to={"update-image"}
        >
          Update Gallery Image
        </Link>
      </ul>
      {isAdmin && <Outlet />}
    </>
  );
};
export default Gallery;
