import React, { useState } from "react";
import { addImage } from "../../../axios/gallery";
const AddImage = () => {
  const [data, setData] = useState({
    gallery: null,
    thumbnail: null,
    rows: "",
    cols: "",
    order: "",
  });
  function handleImage(e) {
    setData((pre) => ({
      ...pre,
      gallery: e.target.files[0],
      thumbnail: e.target.files[0],
    }));
  }
  function handleChange(e) {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fData = new FormData();
    Object.keys(data).forEach((key) => {
      fData.append(key, data[key]);
    });
    // fData.forEach((ele) => console.log(ele));
    addImage(fData);
  }

  return (
    <div className="w-3/5 mx-auto p-5 rounded-md  ">
      <h2 className="text-center text-lg font-semibold mb-10 underline">
        Add Image Gallery
      </h2>

      <form className="gallery-form" onSubmit={handleSubmit}>
        <section>
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
        {/* <section>
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
        {/* <section>
          <label htmlFor="rows">Rows: </label>
          <input
            type="text"
            name="rows"
            id="rows"
            value={data.rows}
            placeholder="Rows"
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="col">Columns: </label>
          <input
            type="text"
            name="cols"
            id="cols"
            value={data.cols}
            placeholder="Columns"
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="order">Order: </label>
          <input
            type="text"
            name="order"
            id="order"
            value={data.order}
            placeholder="Order"
            onChange={handleChange}
          />
        </section> */}
        <button
          className="bg-blue-400 px-3 py-2 text-white rounded-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddImage;
