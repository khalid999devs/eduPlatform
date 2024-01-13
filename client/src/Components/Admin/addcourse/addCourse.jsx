import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FileInput, FormInput } from "./input";
import Coursecard from "./courseCart";
import { postCourse } from "../../../axios/postCourse";
const AddCourse = () => {
  const [isAdmin] = useOutletContext();
  const [courseDetails, setCourse] = useState({
    title: "",
    desc: "",
    schedule: "",
    tags: "",
    demoLink: "",
    cPrice: "",
    imagefile: null,
  });
  const form = new FormData();

  const handlePost = (e) => {
    e.preventDefault();
    const data = {
      title: courseDetails.title,
      description: courseDetails.desc,
      price: courseDetails.cPrice,
      tags: courseDetails.tags,
      ratings: 4,
      schedule: courseDetails.schedule,
      demoVideoUrl: courseDetails.demoLink,
      courses: courseDetails.imagefile,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Object.keys(data).forEach((key) => {
      form.append(`${key}`, data[key]);
    });
    postCourse(form).then((res) => {
      console.log(res);
    });
  };
  if (isAdmin)
    return (
      <div className="overflow-y-scroll h-full w-4/5 mx-auto">
        <p className="mb-6 text-rose-600 font-bold">
          <i>
            {" "}
            "Please fill up the form and click submit to create a new course"{" "}
          </i>
        </p>
        <div className="flex items-start">
          <div className="flex justify-center mb-16 ">
            <form
              id="form"
              className="w-full xl:max-w-5xl"
              onSubmit={handlePost}
            >
              <div className="">
                <div className="w-full flex flex-wrap mb-2 ">
                  <FormInput
                    extraclass={"mb-4"}
                    title={"Title"}
                    placeHolder={"Enter the title [minimum 2 words]"}
                    value={courseDetails.title}
                    handleChange={(e) =>
                      setCourse((pre) => ({ ...pre, title: e.target.value }))
                    }
                  />

                  <FormInput
                    extraclass={"mb-4"}
                    id={"desc"}
                    placeHolder={"Max 100 word"}
                    type={"text"}
                    title={"Description"}
                    box={"textarea"}
                    value={courseDetails.desc}
                    handleChange={(e) =>
                      setCourse((pre) => ({
                        ...pre,
                        desc: e.target.value,
                      }))
                    }
                  />

                  <FormInput
                    extraclass={"mb-4"}
                    id={"tags"}
                    title={"Tags"}
                    placeHolder={"chemistry,organic,organic chemistry"}
                    value={courseDetails.tags}
                    handleChange={(e) =>
                      setCourse((pre) => ({ ...pre, tags: e.target.value }))
                    }
                  />
                  <FormInput
                    extraclass={"mb-4"}
                    id={"schedule"}
                    title={"Schedule"}
                    placeHolder={"Sat, Mon, Wed | 10:30 pm"}
                    value={courseDetails.schedule}
                    handleChange={(e) =>
                      setCourse((pre) => ({ ...pre, schedule: e.target.value }))
                    }
                  />

                  <FormInput
                    extraclass={"mb-4"}
                    id={"demoLink"}
                    title={"DEMO CLASS LINK"}
                    placeHolder={"Demo class link"}
                    value={courseDetails.demoLink}
                    handleChange={(e) =>
                      setCourse((pre) => ({ ...pre, demoLink: e.target.value }))
                    }
                  />

                  <FormInput
                    extraclass={"mb-4"}
                    id={"crsPrice"}
                    title={"Course price"}
                    type={"number"}
                    placeHolder={"2000 TK"}
                    value={courseDetails.cPrice}
                    handleChange={(e) =>
                      setCourse((pre) => ({ ...pre, cPrice: e.target.value }))
                    }
                  />
                </div>

                <FileInput
                  extraClass={"h-fit"}
                  value={courseDetails.imagefile}
                  change={(e) =>
                    setCourse((pre) => ({
                      ...pre,
                      imagefile: e.target.files[0],
                    }))
                  }
                />
              </div>
              <button
                type="submit"
                className=" text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full xl:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <Coursecard
            title={courseDetails.title}
            short={courseDetails.desc}
            imagefile={courseDetails.imagefile}
            cPrice={courseDetails.cPrice}
          />
        </div>
      </div>
    );
};

export default AddCourse;
