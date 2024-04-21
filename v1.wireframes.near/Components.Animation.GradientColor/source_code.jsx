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
const background = props.background ?? "linear-gradient(132deg, #FC415A, #591BC5, #212335)";
const backgroundSize = props.backgroundSize ?? "400% 400%";
const animation = props.animation ?? "Gradient 15s ease infinite";
const position = props.position ?? "relative";
const height = props.height ?? "100vh";
const width = props.width ?? "100%";
const overflow = props.overflow ?? "hidden";
const padding = props.padding ?? "0";
const margin = props.margin ?? "0px";
const backgroundPosition0 = props.backgroundPosition0 ?? "0% 50%";
const backgroundPosition50 = props.backgroundPosition50 ?? "100% 50%";
const backgroundPosition100 = props.backgroundPosition100 ?? "0% 50%";

const AnimationDiv = styled.div`

.background {
  background: ${background};
  background-size: ${backgroundSize};
  animation: ${animation};
  position:  ${position};
  height: ${height};
  width: ${width};
  overflow: ${overflow};
  padding: ${padding};
  margin: ${margin};
}

@keyframes Gradient {
  0% {
    background-position: ${backgroundPosition0};
  }
  50% {
    background-position: ${backgroundPosition50};
  }
  100% {
    background-position: ${backgroundPosition100};
  }
}
`;


return(
    <>
    <AnimationDiv>
    <div class="background">
    </div>
    </AnimationDiv>
    </>
);
