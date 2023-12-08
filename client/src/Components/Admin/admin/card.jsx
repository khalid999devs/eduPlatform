const Card = ({ title, taka, per, perExtra, color }) => {
  return (
    <div className="px-3 flex items-center justify-center text-left ">
      <div className="relative flex flex-col break-words bg-white shadow-xl dark:bg-trans_bluish dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row">
            <div className="flex-none w-3/4 max-w-full px-3">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                  {title}
                </p>
                <h5 className="mb-2 font-bold dark:text-white">{taka}</h5>
                <p className="mb-0 dark:text-white dark:opacity-60">
                  <span className="text-sm font-bold leading-normal text-emerald-500 pr-2">
                    {per}
                  </span>
                  {perExtra}
                </p>
              </div>
            </div>
            <div className="px-3 text-right basis-1/3">
              <div
                className={`inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl ${color}`}
              >
                T
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
