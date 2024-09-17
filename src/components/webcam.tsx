import axios from "axios";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useImage } from "./zustand";
import { useRouter } from "next/navigation";

const WebcamComponent = () => {
  const { setTheImage, images }: any = useImage();
  const [image, setImage] = useState(null);
  const router = useRouter();

  const webcamRef: any = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };

  const saveImage = async () => {
    console.log({ image });
    setTheImage(image);
  };

  const liveness = async () => {
    console.log({ images });
    router.push("/liveness");
  };

  return (
    <>
      {image === null ? (
        <>
          <Webcam
            className="rounded-xl"
            audio={false}
            ref={webcamRef}
            height={500}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
            mirrored={true}
          />
          <button
            className="border-[2px] px-6 py-2 rounded-md font-medium hover:scale-110 ease-in-out duration-300"
            onClick={capture}
          >
            Take photo {"(📸)"}
          </button>
        </>
      ) : (
        <>
          <img src={image} alt="screenshot" />
          <div className="flex gap-[30px]">
            {images.length === 0 ? (
              <>
                <button
                  className="border-[2px] border-rose-300 px-6 py-2 rounded-md font-medium hover:scale-110 ease-in-out duration-300"
                  onClick={() => setImage(null)}
                >
                  Don&apos;t like your photo? 📸
                </button>
                <button
                  className="border-[2px] px-6 py-2 rounded-md font-medium hover:scale-110 ease-in-out duration-300"
                  onClick={saveImage}
                >
                  Confirm?
                </button>
              </>
            ) : (
              <button
                className="border-[2px] px-6 py-2 rounded-md font-medium hover:scale-110 ease-in-out duration-300"
                onClick={liveness}
              >
                Start face liveness
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default WebcamComponent;
