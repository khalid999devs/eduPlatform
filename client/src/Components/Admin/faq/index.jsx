import { Link, Outlet, useOutletContext } from "react-router-dom";
const FAQPage = () => {
  const [isAdmin] = useOutletContext();

  return (
    <>
      <h2 className="text-center my-2 text-xl font-bold">
        Frequently Asked Questions(FAQ)
      </h2>
      <ul className="flex my-2 mx-auto w-fit justify-center items-center hap-5 gap-5">
        <Link
          className="px-5 py-2 text-center bg-blue-300 hover:bg-blue-400"
          to={"add-faq"}
        >
          Add FAQ
        </Link>
        <Link
          className="px-5 py-2 text-center bg-blue-300 hover:bg-blue-400"
          to={"update-faq"}
        >
          Update FAQ
        </Link>
      </ul>
      {isAdmin && <Outlet />}
    </>
  );
};
export default FAQPage;
