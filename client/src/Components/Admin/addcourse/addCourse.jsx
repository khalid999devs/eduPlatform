import React, { useState } from "react";
import { FileInput, FormInput } from "./input";
import Coursecard from "./courseCart";
const AddCourse = () => {
  const [courseDetails, setCourse] = useState({
    title: "",
    shortDesc: "",
    longdesc: "",
    schedule: "",
    demoLink: "",
    cPrice: "",
    imagefile: null,
  });
  return (
    <div className="overflow-y-scroll h-full">
      <p className="mb-6 text-rose-600 font-bold">
        <i>
          {" "}
          "Please fill up the form and click submit to create a new course"{" "}
        </i>
      </p>
      <div className="flex items-start">
        <div className="flex justify-center mb-16 ">
          <form className="w-full xl:max-w-5xl">
            <div className="">
              <div className="w-full flex flex-wrap mb-2 ">
                <FormInput
                  extraclass={"mb-4"}
                  title={"Title"}
                  placeHolder={"Enter the title"}
                  value={courseDetails.title}
                  handleChange={(e) =>
                    setCourse((pre) => ({ ...pre, title: e.target.value }))
                  }
                />

                <FormInput
                  extraclass={"mb-4"}
                  id={"short-desc"}
                  placeHolder={"15-20 words"}
                  type={"text"}
                  title={"Short Description"}
                  box={"textarea"}
                  value={courseDetails.shortDesc}
                  handleChange={(e) =>
                    setCourse((pre) => ({ ...pre, shortDesc: e.target.value }))
                  }
                />

                <FormInput
                  extraclass={"mb-4"}
                  id={"long-desc"}
                  title={"Long description"}
                  box={"textarea"}
                  placeHolder={"50 - 60 words"}
                  value={courseDetails.longdesc}
                  handleChange={(e) =>
                    setCourse((pre) => ({ ...pre, longdesc: e.target.value }))
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
                  setCourse((pre) => ({ ...pre, imagefile: e.target.files[0] }))
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
          short={courseDetails.shortDesc}
          imagefile={courseDetails.imagefile}
          cPrice={courseDetails.cPrice}
        />
      </div>
    </div>
  );
};

export default AddCourse;
