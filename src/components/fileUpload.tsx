"use client";
import { useState } from "react";
import MiniSVGLoader from "./loader";
import fs from "node:fs/promises";
import UploadIcon from "./uploadicon";

export default function FileUpload() {
  const [imageLoader, setImageLoader] = useState(false);
  const [buttonState, setButtonState] = useState("hidden");
  const [image, setImage] = useState(null);

  const handleChange = async (e: any) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
    setButtonState("");
  };

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    // const image = new FormData();
    // image.append("file", image);
    console.log(image);
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <label
        className="cursor-pointer border-[1px] py-2 px-6 rounded-lg hover:scale-110 ease-in-out duration-300"
        htmlFor="image"
      >
        <div className="flex items-center gap-2 font-black">
          <UploadIcon />
          Upload
        </div>

        <input
          type="file"
          id="image"
          name="image"
          accept="png, jpg"
          hidden
          onChange={handleChange}
        />
      </label>
      <button
        className={`h-[30px] border-[1px] rounded-md px-6 hover:scale-110 ease-in-out duration-300 ${buttonState}`}
      >
        Submit
      </button>
    </form>
  );
}
