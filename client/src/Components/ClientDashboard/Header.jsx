import { ContextConsumer } from "../../App";

const Header = () => {
  const { user } = ContextConsumer();

  return (
    <div className="w-full flex flex-row gap-4 md:gap-6 items-center justify-start border-b-2 border-b-gray-300 p-2 pb-4 md:pb-6">
      <div className="w-[80px] h-[80px] ">
        <img
          src={user?.img || "/Images/avatar.webp"}
          alt={user?.name || "alter"}
          width={"100%"}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col ">
        <p className="text-md  lg:text-lg">Hello,</p>
        <h1 className="text-md md:text-xl  lg:text-2xl font-[500]">
          {user.name || "Example Full Name"}
        </h1>
      </div>
    </div>
  );
};

export default Header;
