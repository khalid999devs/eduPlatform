import TimeTable from "./Time";
export function checkHours(hour) {
  if (hour == 0) {
    return {
      time: 12,
      format: "AM",
    };
  }
  if (hour > 0 && hour <= 12) {
    return {
      time: hour,
      format: hour == 12 ? "PM" : "AM",
    };
  }
  if (hour > 12 && hour <= 23) {
    return {
      time: hour - 12,
      format: "PM",
    };
  }
}
function Exam() {

  const EachExamCard = ({ exam, id }) => {
    const starttime = new Date(exam?.exam_date);
    const endtime = new Date(exam?.end_date);

    return (
      <div
        key={id}
        className=" ring ring-red-500 ring-offset-2 mb-5 rounded-lg px-3 flex flex-col justify-center items-center"
      >
        <section className="text-center my-10 font-extrabold text-3xl">
          {exam?.ex_name}
        </section>
        {/* time show */}
        <TimeTable
          checkHours={checkHours}
          time={starttime}
          endTime={endtime}
          showStatus={true}
        />

        <Link href={`${path}/${exam?.id}`}>
          <button className="btn px-3 py-2 bg-slate-600 text-slate-50 rounded-lg h-fit mx-auto my-5 w-fit capitalize">
            see questions
          </button>
        </Link>
      </div>
    );
  };
  return (
    <div className="px-3 py-10 container mx-auto ">
      {examData.length !== 0 ? (
        examData
          ?.sort((a, b) => {
            if (a?.exam_date > b?.exam_date) return -1;
            if (a?.exam_date < b?.exam_date) return 1;
            return 0;
          })
          ?.map((exam, id) => {
            return <EachExamCard exam={exam} key={id} id={exam?.id} />;
          })
      ) : (
        <div>No exams for this course</div>
      )}
    </div>
  );
}

export default Exam;
