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
const width = props.style.width;
const maxWidth = props.style.maxWidth;
const margin = props.style.margin;
const padding = props.style.padding;
const textWrap = props.style.textWrap;

const tabletPadding = props.tabletPadding;
const laptopPadding = props.laptopPadding;
const desktopPadding = props.desktopPadding;

const backgroundColor = props.style.backgroundColor ?? "transparent";

const inlineStyle = props.inlineStyle;

const StyleContainer = styled.div`
  width: ${(props) => props.width || "100%"};
  max-width: ${(props) => props.maxWidth || "1200px"};
  margin: ${(props) => props.margin || "0 auto"};
  padding: ${(props) => props.padding || "0 20px"};
  text-wrap: ${(props) => props.textWrap || "wrap"};
  background-color: ${backgroundColor};

  @media screen and (max-width: 1200px) {
    padding: ${(props) => props.desktopPadding || "0 15px"};
  }

  @media screen and (max-width: 992px) {
    padding: ${(props) => props.laptopPadding || "0 10px"};
  }

  @media screen and (max-width: 768px) {
    padding: ${(props) => props.tabletPadding || "0 5px"};
  }
`;

const Container = ({ children }) => {
  return (
    <StyleContainer
      width={width}
      maxWidth={maxWidth}
      margin={margin}
      padding={padding}
      textWrap={textWrap}
      tabletPadding={tabletPadding}
      laptopPadding={laptopPadding}
      desktopPadding={desktopPadding}
      style={inlineStyle}
    >
      {children}
    </StyleContainer>
  );
};

const children = props.children ?? <h1>Please Enter Children</h1>;
return (
  <StyleContainer
    width={width}
    maxWidth={maxWidth}
    margin={margin}
    padding={padding}
    textWrap={textWrap}
    tabletPadding={tabletPadding}
    laptopPadding={laptopPadding}
    desktopPadding={desktopPadding}
    style={inlineStyle}
  >
    {children}
  </StyleContainer>
);
