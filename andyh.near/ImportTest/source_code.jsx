import { AiOutlineDeploymentUnit } from "https://esm.sh/react-icons@4.10.0/ai?alias=react:preact/compat&deps=preact@10.17.1";
import { FaBeer } from "https://unpkg.com/react-icons@4.12.0";

// import { FaBeer } from "react-icons/fa";
// import Slider from "rc-slider@10.5.0";
// import * as zzz from "rc-slider@10.5.0/";
// import "rc-slider/assets/index.css";
console.log("imported!");
return (
  <div>
    <>
      <span>Hello</span>
      <span>World</span>
    </>
    <AiOutlineDeploymentUnit />
    {/*<Slider range min={100} max={100} />*/}
    <FaBeer />
    <Widget
      src="andyh.near/ImportTest.Child"
      trust={{ mode: "trusted-author" }}
    />
  </div>
);
