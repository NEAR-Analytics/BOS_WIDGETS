import { FaBeer } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

return (
  <div>
    <>
      <span>Hello</span>
      <span>World</span>
    </>
    <Slider range min={100} max={100} />
    <FaBeer />
    <Widget
      src="andyh.near/ImportTest.Child"
      trust={{ mode: "trusted-author" }}
    />
  </div>
);
