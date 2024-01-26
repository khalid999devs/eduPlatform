import React, { useEffect, useState } from "react";
import {
  deleteImage,
  getImageGallery,
  updateImage,
} from "../../../axios/gallery";
import { reqImgWrapper } from "../../../assets/requests";
const UpdateImage = () => {
  const [data, setData] = useState({
    // gallery: null,
    // thumbnail: null,
    rows: 0,
    cols: 0,
    order: 0,
  });
  const [gallery, setGal] = useState([]);
  const [id, setId] = useState(0);
  // function handleImage(e) {
  //   setData((pre) => ({ ...pre, [e.target.name]: e.target.files[0] }));
  // }
  function handleChange(e) {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    getImageGallery(setGal);
  }, []);
  return (
    <div className="w-3/5 h-5/6 overflow-hidden mx-auto rounded-md ">
      <div className=" grid grid-cols-1 gap-5">
        <h2 className="text-center text-lg font-semibold underline">
          Update Image Gallery
        </h2>
        <form
          className="gallery-form"
          onSubmit={(e) => {
            e.preventDefault();
            const fData = data;

            if (id == 0)
              alert("Select any of the image from gallery to update its data");
            else updateImage(id, fData);
            // else fData.forEach((e) => console.log(e));
          }}
        >
          {/* <section>
          <label htmlFor="gallery">Gallery: </label>
          <input
            type="file"
            name="gallery"
            multiple={false}
            id="gallery"
            onChange={handleImage}
            accept="image/png, image/jpg,image/jpeg"
          />
        </section>
        <section>
          <label htmlFor="thumb">Thumbnail: </label>
          <input
            type="file"
            name="thumbnail"
            multiple={false}
            id="thumb"
            onChange={handleImage}
            accept="images/*"
          />
        </section> */}
          <section>
            <label htmlFor="rows">Rows: </label>
            <input
              type="number"
              name="rows"
              id="rows"
              value={data.rows}
              required
              placeholder="Rows"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="col">Columns: </label>
            <input
              type="number"
              name="cols"
              id="cols"
              required
              value={data.cols}
              placeholder="Columns"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="order">Order: </label>
            <input
              type="number"
              name="order"
              id="order"
              required
              value={data.order}
              placeholder="Order"
              onChange={handleChange}
            />
          </section>
          <button
            className="bg-blue-400 px-3 py-2 text-white rounded-sm"
            type="submit"
          >
            Submit
          </button>
        </form>
        {id != 0 && (
          <button
            className="bg-rose-500 px-3 py-2 text-white rounded-sm"
            type="button"
            onClick={() => {
              let x = prompt("Do you want the selected image? [y/n]");
              if (x.toLocaleLowerCase() === "y") {
                deleteImage(id);
              } else {
                setId(0);
              }
            }}
          >
            Delete Image id: {`{${id}}`}
          </button>
        )}
      </div>
      <div className=" flex flex-col gap-2 h-2/3">
        <h2 className="text-center h-fit text-lg font-semibold">
          Image Gallery
        </h2>
        {/* galleryView */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-4 w-auto overflow-y-scroll overflow-hidden h-full">
          {gallery
            .sort((a, b) => {
              return a.order > b.order ? 1 : -1;
            })
            .map((image, imgId) => {
              //image: {id, bigImage, thumbnail, rows,cols,order}
              return (
                <section
                  key={image.createdAt}
                  className={`group overflow-hidden rounded-md border m-0 border-black transition-all ${
                    id == image.id
                      ? "ring ring-offset-2 ring-indigo-500"
                      : "ring ring-offset-0 ring-transparent"
                  }`}
                  onClick={(e) => {
                    setId(image.id != id ? image.id : 0);
                  }}
                >
                  <img
                    className={`bg-white hidden group-hover:block shadow-md aspect-auto`}
                    width={400}
                    height={400 / 4}
                    src={reqImgWrapper(image?.bigImage)}
                    alt={`photo${imgId + 1}.jpg`}
                  />
                  <img
                    className={`bg-white  shadow-md aspect-auto group-hover:hidden`}
                    width={400}
                    height={400 / 4}
                    src={reqImgWrapper(image?.thumbnail)}
                    alt={`photo${imgId + 1}.jpg`}
                  />
                </section>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
