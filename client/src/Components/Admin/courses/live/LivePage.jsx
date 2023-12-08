function ZoomLink() {
  return (
    <div className="dark:text-darkText ">
      <h2 className="text-center font-bold text-2xl">Zoom Live class</h2>
      <div className="max-h-full overflow-y-scr]">
        {examlink.map((val, id) => (
          <Zoom key={id} value={val} />
        ))}
      </div>
    </div>
  );
}
const examlink = [
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
];
const Zoom = ({ id, value }) => {
  return (
    <div className="w-auto flex justify-evenly my-10 p-5">
      <span>{id}</span>
      <p className="font-semibold text-xl">{value?.testTitle}</p>
      <a href={value?.link}>
        <button className="px-4 py-2 w-24 transition-colors bg-blue-600/90 hover:bg-blue-700 text-darkText font-semibold capitalize rounded-lg">
          Join
        </button>
      </a>
      <button className="px-4 py-2 w-24 transition-colors bg-rose-500 hover:bg-red-600 text-darkText font-semibold capitalize rounded-lg">
        Delete
      </button>
    </div>
  );
};

export default ZoomLink;
