"use client";

import dynamic from 'next/dynamic';
import { LoadingProps } from "../../../utils/types";

// Import Lottie dynamically
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import ErrorAnimation from "../../../public/assets/animations/Animation - error.json";
import LoadingAnimation from "../../../public/assets/animations/Animation - loading.json";
import LoginAnimation from "../../../public/assets/animations/Animation - login.json";

export default function Loader({ type }: { type: LoadingProps }) {
  return (
    <div
      className='w-[100vw] h-[100vh] fixed top-0 left-0 flex flex-col justify-center items-center'
      style={{
        zIndex: 150,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.5)",
        transition: ".25s",
      }}
    >
      {type === LoadingProps.ERROR && <Lottie animationData={ErrorAnimation} />}
      {type === LoadingProps.LOADING && <Lottie animationData={LoadingAnimation} />}
      {type === LoadingProps.LOGIN && <Lottie animationData={LoginAnimation} />}
    </div>
  );
}
