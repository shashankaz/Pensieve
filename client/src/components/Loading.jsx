import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-900">
      <InfinitySpin
        visible={true}
        width="200"
        color="#eee"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};
export default Loading;
