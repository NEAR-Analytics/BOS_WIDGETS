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
const transformDegree = props.transformDegree ?? "45deg";
const background = props.background ?? "linear-gradient(-45deg, #FFF,rgba(0, 0, 255, 0))";
const beforeBackground = props.beforeBackground ?? "linear-gradient(-45deg, rgba(0, 0, 255, 0), #FFF, rgba(0, 0, 255, 0))";
const afterBackground = props.afterBackground ?? "linear-gradient(-45deg, rgba(0, 0, 255, 0), #FFF, rgba(0, 0, 255, 0))";
const count = props.count ?? 5;

const AnimationDiv = styled.div`
.night {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateZ(${transformDegree});
}

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: ${background};
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #699bff);
  -webkit-animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
          animation: tail 3000ms ease-in-out infinite, shooting 3000ms ease-in-out infinite;
}
.shooting_star::before {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: ${beforeBackground};
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  -webkit-animation: shining 3000ms ease-in-out infinite;
          animation: shining 3000ms ease-in-out infinite;
}
.shooting_star::after {
  content: "";
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: ${afterBackground};
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  -webkit-animation: shining 3000ms ease-in-out infinite;
          animation: shining 3000ms ease-in-out infinite;
  transform: translateX(50%) rotateZ(-45deg);
}
.shooting_star:nth-child(1) {
  top: calc(50% - -143px);
  left: calc(50% - 213px);
  -webkit-animation-delay: 6963ms;
          animation-delay: 6963ms;
}
.shooting_star:nth-child(1)::before, .shooting_star:nth-child(1)::after {
  -webkit-animation-delay: 6963ms;
          animation-delay: 6963ms;
}
.shooting_star:nth-child(2) {
  top: calc(50% - 72px);
  left: calc(50% - 113px);
  -webkit-animation-delay: 186ms;
          animation-delay: 186ms;
}
.shooting_star:nth-child(2)::before, .shooting_star:nth-child(2)::after {
  -webkit-animation-delay: 186ms;
          animation-delay: 186ms;
}
.shooting_star:nth-child(3) {
  top: calc(50% - 84px);
  left: calc(50% - 169px);
  -webkit-animation-delay: 821ms;
          animation-delay: 821ms;
}
.shooting_star:nth-child(3)::before, .shooting_star:nth-child(3)::after {
  -webkit-animation-delay: 821ms;
          animation-delay: 821ms;
}
.shooting_star:nth-child(4) {
  top: calc(50% - 189px);
  left: calc(50% - 92px);
  -webkit-animation-delay: 5622ms;
          animation-delay: 5622ms;
}
.shooting_star:nth-child(4)::before, .shooting_star:nth-child(4)::after {
  -webkit-animation-delay: 5622ms;
          animation-delay: 5622ms;
}
.shooting_star:nth-child(5) {
  top: calc(50% - -196px);
  left: calc(50% - 51px);
  -webkit-animation-delay: 6258ms;
          animation-delay: 6258ms;
}
.shooting_star:nth-child(5)::before, .shooting_star:nth-child(5)::after {
  -webkit-animation-delay: 6258ms;
          animation-delay: 6258ms;
}
.shooting_star:nth-child(6) {
  top: calc(50% - 104px);
  left: calc(50% - 229px);
  -webkit-animation-delay: 1237ms;
          animation-delay: 1237ms;
}
.shooting_star:nth-child(6)::before, .shooting_star:nth-child(6)::after {
  -webkit-animation-delay: 1237ms;
          animation-delay: 1237ms;
}
.shooting_star:nth-child(7) {
  top: calc(50% - -197px);
  left: calc(50% - 41px);
  -webkit-animation-delay: 6249ms;
          animation-delay: 6249ms;
}
.shooting_star:nth-child(7)::before, .shooting_star:nth-child(7)::after {
  -webkit-animation-delay: 6249ms;
          animation-delay: 6249ms;
}
.shooting_star:nth-child(8) {
  top: calc(50% - -94px);
  left: calc(50% - 271px);
  -webkit-animation-delay: 3637ms;
          animation-delay: 3637ms;
}
.shooting_star:nth-child(8)::before, .shooting_star:nth-child(8)::after {
  -webkit-animation-delay: 3637ms;
          animation-delay: 3637ms;
}
.shooting_star:nth-child(9) {
  top: calc(50% - 76px);
  left: calc(50% - 190px);
  -webkit-animation-delay: 2514ms;
          animation-delay: 2514ms;
}
.shooting_star:nth-child(9)::before, .shooting_star:nth-child(9)::after {
  -webkit-animation-delay: 2514ms;
          animation-delay: 2514ms;
}
.shooting_star:nth-child(10) {
  top: calc(50% - -167px);
  left: calc(50% - 216px);
  -webkit-animation-delay: 7377ms;
          animation-delay: 7377ms;
}
.shooting_star:nth-child(10)::before, .shooting_star:nth-child(10)::after {
  -webkit-animation-delay: 7377ms;
          animation-delay: 7377ms;
}
.shooting_star:nth-child(11) {
  top: calc(50% - 176px);
  left: calc(50% - 254px);
  -webkit-animation-delay: 8920ms;
          animation-delay: 8920ms;
}
.shooting_star:nth-child(11)::before, .shooting_star:nth-child(11)::after {
  -webkit-animation-delay: 8920ms;
          animation-delay: 8920ms;
}
.shooting_star:nth-child(12) {
  top: calc(50% - 17px);
  left: calc(50% - 211px);
  -webkit-animation-delay: 2348ms;
          animation-delay: 2348ms;
}
.shooting_star:nth-child(12)::before, .shooting_star:nth-child(12)::after {
  -webkit-animation-delay: 2348ms;
          animation-delay: 2348ms;
}
.shooting_star:nth-child(13) {
  top: calc(50% - -64px);
  left: calc(50% - 49px);
  -webkit-animation-delay: 3291ms;
          animation-delay: 3291ms;
}
.shooting_star:nth-child(13)::before, .shooting_star:nth-child(13)::after {
  -webkit-animation-delay: 3291ms;
          animation-delay: 3291ms;
}
.shooting_star:nth-child(14) {
  top: calc(50% - -69px);
  left: calc(50% - 46px);
  -webkit-animation-delay: 4365ms;
          animation-delay: 4365ms;
}
.shooting_star:nth-child(14)::before, .shooting_star:nth-child(14)::after {
  -webkit-animation-delay: 4365ms;
          animation-delay: 4365ms;
}
.shooting_star:nth-child(15) {
  top: calc(50% - 117px);
  left: calc(50% - 94px);
  -webkit-animation-delay: 2452ms;
          animation-delay: 2452ms;
}
.shooting_star:nth-child(15)::before, .shooting_star:nth-child(15)::after {
  -webkit-animation-delay: 2452ms;
          animation-delay: 2452ms;
}
.shooting_star:nth-child(16) {
  top: calc(50% - -188px);
  left: calc(50% - 5px);
  -webkit-animation-delay: 1626ms;
          animation-delay: 1626ms;
}
.shooting_star:nth-child(16)::before, .shooting_star:nth-child(16)::after {
  -webkit-animation-delay: 1626ms;
          animation-delay: 1626ms;
}
.shooting_star:nth-child(17) {
  top: calc(50% - -108px);
  left: calc(50% - 150px);
  -webkit-animation-delay: 3490ms;
          animation-delay: 3490ms;
}
.shooting_star:nth-child(17)::before, .shooting_star:nth-child(17)::after {
  -webkit-animation-delay: 3490ms;
          animation-delay: 3490ms;
}
.shooting_star:nth-child(18) {
  top: calc(50% - -58px);
  left: calc(50% - 60px);
  -webkit-animation-delay: 2654ms;
          animation-delay: 2654ms;
}
.shooting_star:nth-child(18)::before, .shooting_star:nth-child(18)::after {
  -webkit-animation-delay: 2654ms;
          animation-delay: 2654ms;
}
.shooting_star:nth-child(19) {
  top: calc(50% - -115px);
  left: calc(50% - 33px);
  -webkit-animation-delay: 8548ms;
          animation-delay: 8548ms;
}
.shooting_star:nth-child(19)::before, .shooting_star:nth-child(19)::after {
  -webkit-animation-delay: 8548ms;
          animation-delay: 8548ms;
}
.shooting_star:nth-child(20) {
  top: calc(50% - 164px);
  left: calc(50% - 161px);
  -webkit-animation-delay: 957ms;
          animation-delay: 957ms;
}
.shooting_star:nth-child(20)::before, .shooting_star:nth-child(20)::after {
  -webkit-animation-delay: 957ms;
          animation-delay: 957ms;
}

@-webkit-keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}
@-webkit-keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}
@keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}
@-webkit-keyframes sky {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
@keyframes sky {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
`;

const starItems = [];

for (let i = 0; i < count; i++) {
  starItems.push(
    <div key={i} className="shooting_star">
      
    </div>
  );
}

return(
    <>
    <AnimationDiv>
    <div class="night">
 {starItems}
</div>
    </AnimationDiv>
    </>
);
