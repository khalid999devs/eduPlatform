function Video() {
  return (
    <>
      <div className="p-2 w-80 md:w-1/2 xl:w-1/3 rounded-xl border-2 border-dashed border-sky-500  shadow-xl shadow-root_bluish/50 m-5">
        <iframe
          className="w-full rounded-xl h-auto aspect-video"
          width={1600 / 50}
          height={900 / 50}
          src="https://www.youtube.com/embed/OXuskB_9uaw?si=CP0aXNtnCxgpTfgv"
          title="new south indian movies dubbed in hindi 2023 full New Movie| South Movie 2023 Chandramukhi 2"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowfullscreen
        ></iframe>
        <p className="my-4 font-semibold text-left text-xl w-autp dark:text-darkText">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          consequuntur perferendis pariatur dicta aliquam.
        </p>
      </div>
    </>
  );
}

export default Video;
