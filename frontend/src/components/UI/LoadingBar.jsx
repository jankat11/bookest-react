import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const LoadingBar = () => {
  return (
    <div className="px-0 mx-0 load position-relative">
      <Spinner className="circle-1 position-relative" size="sm" animation="grow" />
      <Spinner className="position-relative" size="sm" animation="grow" />
      <Spinner className="circle-3 position-relative" size="sm" animation="grow" />
    </div>
  );
};
export default LoadingBar;
