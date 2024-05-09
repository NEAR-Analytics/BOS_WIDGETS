/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */

/* -------------------------------------------------------------------------- */
const backgroundColor = props.backgroundColor ?? "linear-gradient(180deg, #04fafd, 5%, #119dff, 50%, #030423)";
const count = props.count ?? 15;
const dotBackgroundColor = props.dotBackgroundColor ?? "rgba(255, 255, 255, 0.5)";
const dotHeight = props.dotHeight ?? "10px";
const dotWidth = props.dotWidth ?? "10px";
const dotBorderRadius = props.dotBorderRadius ?? "50px";
const dotPosition = props.dotPosition ?? "absolute";
const dotTop = props.dotTop ?? "20%";
const dotLeft = props.dotLeft ?? "20%";
const transform0 = props.transform0 ?? "scale(0) translateY(0) rotate(70deg)";
const transform100 = props.transform100 ?? "scale(1.3) translateY(-2000px) rotate(360deg)";
const AnimationDiv = styled.div`
.wrapper {
  height: 100%;
  width: 100%;
  background: ${backgroundColor};
  position: absolute;
}
.wrapper h1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-family: sans-serif;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: #fff;
  font-size: 40px;
  font-weight: 888;
  text-transform: uppercase;
}
.wrapper div {
  height: 60px;
  width: 60px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  position: absolute;
  top: 10%;
  left: 10%;
  animation: 4s linear infinite;
}
div .dot {
  height: ${dotHeight};
  width: ${dotWidth};
  border-radius: ${dotBorderRadius};
  background: ${dotBackgroundColor};
  position: ${dotPosition};
  top: ${dotTop};
  right: ${dotLeft};
}
.wrapper div:nth-child(1) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(2) {
  top: 60%;
  left: 80%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(3) {
  top: 40%;
  left: 40%;
  animation: animate 3s linear infinite;
}
.wrapper div:nth-child(4) {
  top: 66%;
  left: 30%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(5) {
  top: 90%;
  left: 10%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(6) {
  top: 30%;
  left: 60%;
  animation: animate 5s linear infinite;
}
.wrapper div:nth-child(7) {
  top: 70%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(8) {
  top: 75%;
  left: 60%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(9) {
  top: 50%;
  left: 50%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(10) {
  top: 45%;
  left: 20%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(11) {
  top: 10%;
  left: 90%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(12) {
  top: 20%;
  left: 70%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(13) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(14) {
  top: 60%;
  left: 5%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(15) {
  top: 90%;
  left: 80%;
  animation: animate 9s linear infinite;
}
@keyframes animate {
  0% {
    transform: ${transform0};
  }
  100% {
    transform: ${transform100};
  }
}

`;
const items = [];

for (let i = 0; i < count; i++) {
  items.push(
    <div key={i}>
     <span class="dot"></span>
    </div>
  );
}


return(
    <>
    <AnimationDiv>
    <div class="wrapper">
    {items}
      </div>
    </AnimationDiv>
    </>
);
