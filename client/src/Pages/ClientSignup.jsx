import SignupForm from "../Components/Account/Client/SignupForm";
import { Link } from "react-router-dom";

function ClientSignUp() {
  return (
    <div className=" signin min-h-[60vh] max-w-[750px]  m-auto p-4 mb-24 mt-14">
      <SignupForm />
      <div className="mt-5">
        <h1 className="text-center ">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 text-center transition-color hover:text-blue-700"
          >
            Sign in
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default ClientSignUp;
