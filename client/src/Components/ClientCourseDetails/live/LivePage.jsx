function ZoomLink() {
  return (
    <div className="dark:text-darkText ">
      <h2 className="text-center font-bold text-2xl text-primary-dark">
        Zoom Live class
      </h2>
      <div className="max-h-full overflow-y-auto">
        {classLink.length ? (
          classLink.map((val, id) => <Zoom key={id} value={val} />)
        ) : (
          <>
            <h4 className="text-center py-2 text-rose-500">
              Live class not found.
            </h4>
          </>
        )}
      </div>
    </div>
  );
}
const classLink = [
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
];
const Zoom = ({ id, value }) => {
  return (
    <div className="w-auto flex justify-evenly my-2 p-5">
      <span>{id}</span>
      <p className="font-semibold text-xl">{value?.testTitle}</p>
      <a href={value?.link}>
        <button className="px-4 py-2 w-24 transition-colors bg-blue-600/90 hover:bg-blue-700 text-darkText font-semibold capitalize rounded-lg">
          Join
        </button>
      </a>
    </div>
  );
};

export default ZoomLink;
