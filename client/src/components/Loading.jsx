import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#000"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};
export default Loading;
