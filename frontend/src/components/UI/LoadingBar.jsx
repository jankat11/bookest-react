import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const LoadingBar = () => {
  const [delay, setDelay] = useState(false);
  const [delay2, setDelay2] = useState(false);

  useEffect(() => {
    const delayTimeout1 = setTimeout(() => {
      setDelay(true);
    }, 100);
    const delayTimeout2 = setTimeout(() => {
      setDelay2(true);
    }, 200);
    return () => {
      clearTimeout(delayTimeout1);
      clearTimeout(delayTimeout2);
    };
  }, []);

  return (
    <div className="px-0 mx-0 load position-relative">
      <Spinner  className="position-relative" size="sm" animation="grow" />
      {delay && <Spinner   className="delay2 position-relative" size="sm" animation="grow" />}
      {delay2 && <Spinner  className="delay3 position-relative" size="sm" animation="grow" />}
    </div>
  );
};
export default LoadingBar;
