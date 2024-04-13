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

const width = props.style.width ?? "100vw";
const minWidth = props.style.minWidth ?? "100vw";
const height = props.style.height ?? "99vh";
const minHeight = props.style.minHeight ?? "100%";
const maxHeight = props.style.maxHeight ?? "100%";
const maxWidth = props.style.maxWidth ?? "100%";
const margin = props.style.margin ?? "0";
const padding = props.style.padding ?? "0";
const textWrap = props.style.textWrap ?? "wrap";
const backgroundColor = props.style.backgroundColor ?? "transparent";

const tabletPadding = props.tabletPadding ?? "0";
const laptopPadding = props.laptopPadding ?? "0";
const desktopPadding = props.desktopPadding ?? "0";

const inlineStyle = props.inlineStyle;

const StyleContainer = styled.div`
  width: ${width};
  height: ${height};
  min-height: ${minHeight};
  max-height: ${maxHeight};
  max-width: ${maxWidth};
  min-width: ${minWidth};
  margin: ${margin};
  padding: ${padding};
  text-wrap: ${textWrap};
  background-color: ${backgroundColor};

  @media screen and (max-width: 1200px) {
    padding: ${desktopPadding};
  }

  @media screen and (max-width: 992px) {
    padding: ${laptopPadding};
  }

  @media screen and (max-width: 768px) {
    padding: ${tabletPadding};
  }
`;

const Container = ({ children }) => {
  return <StyleContainer style={inlineStyle}>{children}</StyleContainer>;
};

const children = props.children ?? <h1>Please Enter Children</h1>;

return (<StyleContainer style={inlineStyle}>{children}</StyleContainer>);
