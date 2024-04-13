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

const alertChildren = props.alert.children;

const label = props.alertTitle ?? "A simple Alert!";
const mainTitle = props.mainTitle ?? "ALert";
const isDisable = props.isDisable ?? false;
const inlineStyle = props.inlineStyle;
const top = props.style.top;
const bottom = props.style.bottom;
const left = props.style.left;
const border = props.style.border;
const padding = props.style.padding;
const position = props.style.position;
const minWidth = props.style.minWidth;
const boxShadow = props.style.boxShadow;
const borderRadius = props.style.borderRadius;
const backgroundColor = props.style.backgroundColor;

const showAlert = props.showAlert;
const setShowAlert = props.setShowAlert;

const AlertWrapper = styled.div`
  position: ${(props) => props.position || "fixed"};
  top: ${(props) => props.top || "0%"};
  bottom: ${(props) => props.bottom || "100%"};
  left: ${(props) => props.left || "50%"};
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.backgroundColor || "#0d6efd"};
  padding: ${(props) => props.padding || "0px"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  box-shadow: ${(props) => props.boxShadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  z-index: 10000;
  min-width: ${(props) => props.minWidth || "60%"};
  min-width: -webkit-fill-available;
`;

return (
  <>
    <div>
      {showAlert && (
        <AlertWrapper
          top={top}
          bottom={bottom}
          left={left}
          border={border}
          padding={padding}
          position={position}
          minWidth={minWidth}
          boxShadow={boxShadow}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          inlineStyle={inlineStyle}
        >
          <>{alertChildren}</>
        </AlertWrapper>
      )}
    </div>
  </>
);
