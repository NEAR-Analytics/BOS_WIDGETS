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

const circlesPossition = props.circlesPossition ?? "absolute";
const circlesTop = props.circlesTop ?? "0";
const circlesLeft = props.circlesLeft ?? "0";
const circlesWidth = props.circlesWidth ?? "100%";
const circlesHeight = props.circlesHeight ?? "100%";
const circlesOverflow = props.circlesOverflow ?? "hidden";

const circlesLiPosition = props.circlesLiPosition ?? "absolute";
const circlesLiDisplay = props.circlesLiDisplay ?? "block";
const circlesLiWidth = props.circlesLiWidth ?? "20px";
const circlesLiHeight = props.circlesLiHeight ?? "20px";
const circlesLiBackground = props.circlesLiBackground ?? "rgba(255, 255, 255, 0.2)";
const circlesLiBottom = props.circlesLiBottom ?? "-150px";

const count = props.count ?? 10;

const transform0 = props.transform0 ?? "translateY(0) rotate(0deg)";
const trasnform100 = props.trasnform100 ?? "translateY(-2000px) rotate(720deg)";

const AnimationDiv = styled.div`


.circles{
  position: ${circlesPossition};
  top: ${circlesTop};
  left: ${circlesLeft};
  width: ${circlesWidth};
  height: ${circlesHeight};
  overflow: ${circlesOverflow};
}

.circles li{
  position: ${circlesLiPosition};
  display: ${circlesLiDisplay};
  list-style: none;
  width: ${circlesLiWidth};
  height: ${circlesLiHeight};
  background: ${circlesLiBackground};
  animation: animate 25s linear infinite;
  bottom: ${circlesLiBottom};
}

.circles li:nth-child(1){
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}


.circles li:nth-child(2){
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3){
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4){
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5){
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6){
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7){
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8){
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9){
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10){
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}



@keyframes animate {

  0%{
      transform: ${transform0};
      opacity: 1;
      border-radius: 0;
  }

  100%{
      transform: ${trasnform100};
      opacity: 0;
      border-radius: 50%;
  }

}
`;

const items = [];

for (let i = 0; i < count; i++) {
  items.push(
    <li></li>
  );
}


return(
    <>
    <AnimationDiv>
            <ul class="circles">
                    {items}
            </ul>
    </AnimationDiv>
    </>
);

