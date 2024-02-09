import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { AdminConsumer } from "./Admin";
import Input from "../../Components/Form/Input";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import AlertBox from "../../Components/Form/AlertBox";
import Popup from "../../Components/Alerts/Popup";
import reqs from "../../assets/requests";
function AdminLogin({ children }) {
  const { user, settings, adminTrigger, setAdminTrigger } = AdminConsumer();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [emailMob, setemailMob] = useState("");
  const [pass, setpass] = useState("");
  const [check, setchk] = useState(false);
  const [show, handlePass] = useState(false);
  const [error, setError] = useState({ text: "", alert: "", state: false });
  const [popup, setPopup] = useState({ text: "", state: "" }); //state: error,warning,success
  const [isAdmin] = useOutletContext();
  const loginAdmin = (e) => {
    e.preventDefault();

    const data = {
      userName: emailMob,
      password: pass,
    };
    setLoading(true);
    setPopup({ text: "Logging in..." });
    axios
      .post(reqs.ADMIN_LOGIN, { ...data }, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setPopup({ text: res.data.msg, state: "success" });
          setAdminTrigger(!adminTrigger);
          navigate(`/abs-admin`);
        } else {
          navigate(settings.redirect);
          throw new Error(res.data.msg);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPopup({
          text: err.response?.data.msg || err.message || "Login failed",
          state: "error",
        });
        setpass("");
      });
  };
  if (!isAdmin)
    return (
      <>
        {popup.text && (
          <Popup
            state={popup.state}
            text={popup.text}
            loading={loading}
            onClick={() => {
              setLoading(false);
              setPopup({ text: "", state: "" });
            }}
          />
        )}
        {error.state && (
          <AlertBox setAlert={setError} text={error.text} alert={error.alert} />
        )}
        {!user?.userName ? (
          <form
            className="create backdrop-blur-lg bg-slate-100/10 w-full max-w-2xl my-20 md:px-20 shadow-lg p-6 pt-0 h-fit"
            onSubmit={loginAdmin}
          >
            <h1 className=" text-center text-3xl underline font-bold my-10 mx-auto">
              Admin login
            </h1>
            {/* email */}
            <Input
              id={"userName"}
              placeHolder={"username"}
              setVal={setemailMob}
              value={emailMob}
              autoComplete={true}
              title={"userName"}
              required={true}
            />
            {/* password */}
            <Input
              id={"pass"}
              placeHolder={"enter your password"}
              setVal={setpass}
              value={pass}
              autoComplete={false}
              type={"password"}
              title={"Password"}
              show={show}
              required={true}
              handlePass={() => handlePass((pre) => !pre)}
            />
            {/* check box */}
            <PrimaryButton
              classes={
                "flex justify-start gap-4 items-center select-none -mx-2 hover:scale-100"
              }
              onClick={(e) => {
                e.preventDefault();
                setchk((pre) => !pre);
              }}
              children={
                <>
                  <div
                    className={`w-3 h-3 p-1 rounded-full ring-1 ring-offset-1 duration-150 ease-linear ${
                      check
                        ? "bg-sky-500 ring-sky-400"
                        : "bg-transparent ring-gray-400"
                    }`}
                  ></div>
                  <p className="text-xs capitalize">Remember me</p>
                </>
              }
            />
            {/* button */}
            <PrimaryButton
              classes={"bg-onPrimary-main p-3"}
              textClasses={"text-center w-full text-white"}
              text={"Login"}
              type={"submit"}
            />
            <div className="mt-4">{children}</div>
          </form>
        ) : (
          <div className="h-full">
            <h2 className="text-center text-3xl my-96 font-bold mx-auto">
              Admin is logged in as{" "}
              <span className="underline text-secondary-main bg-onPrimary-main rounded-md p-1">
                {user?.userName}
              </span>
            </h2>
          </div>
        )}
      </>
    );
  else
    return (
      <div className="w-auto mt-20">
        <p className="text-center text-base">
          You are logged in as{" "}
          <span className="text-green-500 text-xl font-semibold uppercase mx-1 font-mono p-1 rounded-md bg-slate-200">
            admin
          </span>{" "}
        </p>
      </div>
    );
}

export default AdminLogin;
