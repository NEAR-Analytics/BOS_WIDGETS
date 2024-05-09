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
const position = props.position ?? "absolute";
const top = props.top ?? "80vh";
const left = props.left ?? "45vw";
const width = props.width ?? "10px";
const height = props.height ?? "10px";
const border = props.border ?? "solid 1px #D7D4E4";
const transformOrigin = props.transformOrigin ?? "top left";
const transform = props.transform ?? "scale(0) rotate(0deg) translate(-50%, -50%)";
const transformFrom = props.transformFrom ?? "scale(0) rotate(0deg) translate(-50%, -50%)";
const transformFromOpacity = props.transformFromOpacity ?? "1";
const transformTo = props.transformTo ?? "scale(20) rotate(960deg) translate(-50%, -50%)";
const transformToOpacity = props.transformToOpacity ?? "0";
const count = props.count ?? 5;

const AnimationDiv = styled.div`

.cube {
  position: ${position};
  top: ${top};
  left: ${left};
  width: ${width};
  height: ${height};
  border: ${border};
  transform-origin: ${transformOrigin};
  transform: ${transform};
  animation: cube 12s ease-in forwards infinite;
}
.cube:nth-child(2n) {
  border-color: #FFF ;
}
.cube:nth-child(2) {
  animation-delay: 2s;
  left: 25vw;
  top: 40vh;
}
.cube:nth-child(3) {
  animation-delay: 4s;
  left: 75vw;
  top: 50vh;
}
.cube:nth-child(4) {
  animation-delay: 6s;
  left: 90vw;
  top: 10vh;
}
.cube:nth-child(5) {
  animation-delay: 8s;
  left: 10vw;
  top: 85vh;
}
.cube:nth-child(6) {
  animation-delay: 10s;
  left: 50vw;
  top: 10vh;
}
@keyframes cube {
  from {
    transform: ${transformFrom};
    opacity: 1;
  }
  to {
    transform: ${transformTo};
    opacity: 0;
  }
}
`;

const cubeItems = [];

for (let i = 0; i < count; i++) {
  cubeItems.push(
    <div key={i} className="cube">
      
    </div>
  );
}
return(
    <>
    <AnimationDiv>
{cubeItems}
    </AnimationDiv>
    </>
);

