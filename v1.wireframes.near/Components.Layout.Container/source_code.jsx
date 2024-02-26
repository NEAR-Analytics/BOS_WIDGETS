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

                          
const StyleContainer = styled.div`
  margin-right: ${(props) => props.marginRight || "auto"};
  margin-left:  ${(props) => props.marginLeft || "auto"};
  padding-right: ${(props) => props.paddingRight || "2%"};
  padding-left: ${(props) => props.paddingLeft || "2%"};
  width: ${(props) => props.width || "96%"};   /* Use 100% - (2% + 2%) to account for padding on both sides */
  text-wrap: ${(props) => props.textWrap || "wrap"};

  /* Responsive container */
  @media (min-width: 576px) {
    width: ${(props) => props.mobileWidth || "94%"};
  }
  @media (min-width: 768px) {
    width: ${(props) => props.tabletWidth || "92%"};
  }
  @media (min-width: 992px) {
    width: ${(props) => props.laptopWidth || "90%"};
  }
  @media (min-width: 1200px) {
    width: ${(props) => props.desktopWidth || "88%"};
  }
`;

const marginRight = props.style.marginRight;
const marginLeft = props.style.marginLeft;
const paddingRight = props.style.paddingRight;
const paddingLeft = props.style.paddingLeft;
const width = props.style.width;
const textWrap = props.style.textWrap;

const mobileWidth = props.style.mobileWidth;
const tabletWidth = props.style.tabletWidth;
const laptopWidth = props.style.laptopWidth;
const desktopWidth = props.style.desktopWidth;

const children = props.children ?? (<h1>Please Enter Children</h1>);
return (
    <StyleContainer
      width={width}
      textWrap={textWrap}
      marginLeft={marginLeft}
      marginRight={marginRight}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}

      mobileWidth={mobileWidth}
      tabletWidth={tabletWidth}
      laptopWidth={laptopWidth}
      desktopWidth={desktopWidth}
    >
    { children }
    </StyleContainer>
);



