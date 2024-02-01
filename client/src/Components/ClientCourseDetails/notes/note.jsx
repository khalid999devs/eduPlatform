function Notes() {
  return (
    <div className="dark:text-darkText ">
      <h2 className="text-center font-bold text-2xl text-primary-dark">
        Note Link
      </h2>
      <div className="max-h-full overflow-y-auto">
        {notedata.length ? (
          notedata.map((val, id) => <NoteLink key={id} id={id} value={val} />)
        ) : (
          <>
            <h4 className="text-center py-2 text-rose-500">
              Note link not found.
            </h4>
          </>
        )}
      </div>
    </div>
  );
}
const notedata = [
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
];
const NoteLink = ({ id, value }) => {
  return (
    <div className="w-auto flex justify-evenly my-2 p-5">
      <p className="font-semibold text-xl">
        <span className="mx-2 ">{id + 1}.</span>
        {value?.testTitle}
      </p>
      <a href={value?.link}>
        <button className="px-4 py-2 w-24 transition-colors hover:bg-secondary-main bg-yellow-100 text-onPrimary-main text-root_bluish font-semibold capitalize rounded-lg">
          See
        </button>
      </a>
    </div>
  );
};

export default Notes;
