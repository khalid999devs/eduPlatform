function ExamLinks() {
  return (
    <div className="dark:text-darkText ">
      <h2 className="text-center font-bold text-2xl text-primary-dark">
        Exam Link
      </h2>
      <div className="max-h-full overflow-y-auto">
        {examlink.length ? (
          examlink.map((val, id) => <ExamLink key={id} value={val} />)
        ) : (
          <>
            <h4 className="text-center py-2 text-rose-500">Exam not found.</h4>
          </>
        )}
      </div>
    </div>
  );
}
const examlink = [
  {
    testTitle: "Sanctus diam duo dolore amet.",
    link: "#",
  },
];
const ExamLink = ({ id, value }) => {
  return (
    <div className="w-auto flex justify-evenly my-2 p-5">
      <span>{id}</span>
      <p className="font-semibold text-xl">{value?.testTitle}</p>
      <a href={value?.link}>
        <button className="px-4 py-2 w-24 transition-colors bg-green-400 hover:bg-green-500 text-onPrimary-main font-semibold capitalize rounded-lg">
          Start
        </button>
      </a>
    </div>
  );
};

export default ExamLinks;
