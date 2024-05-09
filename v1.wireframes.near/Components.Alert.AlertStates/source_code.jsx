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

const label = props.alertTitle ?? "A simple Alert!";
const mainTitle = props.mainTitle ?? "Alert";
const inlineStyle = props.inlineStyle;
const onClick = props.onClick ?? (() => {});

const padding = props.style.padding;
const fontSize = props.style.fontSize;
const fontFamily = props.style.fontFamily;
const fontWeight = props.style.fontWeight;
const backgroundColor = props.style.backgroundColor;
const border = props.style.border;
const fontColor = props.style.fontColor;
const borderRadius = props.style.borderRadius;
const width = props.style.width;
const height = props.style.height;

const containerDisplay = props.style.containerDisplay ?? "flex";

const iconMargin = props.style.iconMargin ?? "0 5px 0";

const innerContainerWidth = props.style.innerContainerWidth;
const innerDisplay = props.style.innerDisplay;
const innerJustifyContent = props.style.innerJustifyContent;

const mainTitleFontColor = props.style.mainTitleFontColor;
const mainTitleFontSize = props.style.mainTitleFontSize;
const mainTitleFontWeight = props.style.mainTitleFontWeight;

const contentWidth = props.style.contentWidth;
const contentDisplay = props.style.contentDisplay;
const contentAlignItems = props.style.contentAlignItems;
const contentFontSize = props.style.contentFontSize;
const contentFontColor = props.style.contentFontColor;
const contentFontWeight = props.style.contentFontWeight;
const contentMarginBottom = props.style.contentMarginBottom;

const iconCloseDisplay = props.style.iconCloseDisplay;
const iconCloseAlignItems = props.style.iconCloseAlignItems;

const icon = props.icon ?? "exclamation-triangle-fill";
const cancelIconName = props.cancelIconName ?? "x-lg";
const isIcon = props.isIcon ?? false;
const iconClose = props.iconClose ?? false;
const iconSize = props.iconSize ?? "20px";
const cancelIconSize = props.cancelIconSize ?? "20px";
const iconColor = props.iconColor ?? "#fff";
const cancelIconColor = props.cancelIconColor ?? "#fff";

const showAlert = props.showAlert;
const setShowAlert = props.setShowAlert;

const closeBtnBackground = props.style.closeBtnBackground ?? "none";
const closeBtnBorder = props.style.closeBtnBorder ?? "none";
const closeBtnBorderRadius = props.style.closeBtnBorderRadius ?? "10px";

const AlertStates = styled.div`
  background-color: ${(props) => props.backgroundColor || "#0d6efd"};
  color: ${(props) => props.fontColor || "#fff"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  border: ${(props) => props.border || "none"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-family: ${(props) =>
    props.fontFamily ||
    "system-ui,-apple-system,system-ui,Helvetica Neue,Helvetica,Arial,sans-serif"};
`;

const Container = styled.div`
  display: ${containerDisplay};
`;

const Icon = styled.span`
  margin: ${iconMargin};
`;

const InnerContainer = styled.div`
  width: ${(props) => props.innerContainerWidth || "100%"};
  display: ${(props) => props.innerDisplay || "flex"};
  justify-content: ${(props) => props.innerJustifyContent || "space-between"};
  font-weight: ${(props) => props.mainTitleFontWeight || "600"};
  font-size: ${(props) => props.mainTitleFontSize || "16px"};
  color: ${(props) => props.mainTitleFontColor || "#fff"};
`;

const Content = styled.p`
  width: ${(props) => props.contentWidth || "100%"};
  display: ${(props) => props.contentDisplay || "flex"};
  align-items: ${(props) => props.contentAlignItems || "center"};
  margin-bottom: ${(props) => props.contentMarginBottom || "0px"};
  font-weight: ${(props) => props.contentFontWeight || "400"};
  font-size: ${(props) => props.contentFontSize || "16px"};
  color: ${(props) => props.contentFontColor || "#fff"};
`;
const IconClose = styled.span`
  display: ${(props) => props.iconCloseDisplay || "flex"};
  align-items: ${(props) => props.iconCloseAlignItems || "start"};
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: ${closeBtnBackground};
  border: ${closeBtnBorder};
  border-radius: ${closeBtnBorderRadius};
`;





return (
  <>
    <AlertStates
      width={width}
      height={height}
      border={border}
      padding={padding}
      fontSize={fontSize}
      fontColor={fontColor}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      style={inlineStyle}
    >
      {isIcon == true ? (
        <Container containerDisplay={containerDisplay}>
          <Icon>
            <Widget
              src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
              props={{
                iconName: icon,
                iconSize: iconSize,
                iconColor: iconColor,
              }}
            />
          </Icon>
          <InnerContainer
            innerContainerWidth={innerContainerWidth}
            innerDisplay={innerDisplay}
            innerJustifyContent={innerJustifyContent}
            mainTitleFontSize={mainTitleFontSize}
            mainTitleFontColor={mainTitleFontColor}
            mainTitleFontWeight={mainTitleFontWeight}
          >
            <div>
              {mainTitle}
              <Content
                contentWidth={contentWidth}
                contentDisplay={contentDisplay}
                contentAlignItems={contentAlignItems}
                contentFontSize={contentFontSize}
                contentFontColor={contentFontColor}
                contentFontWeight={contentFontWeight}
                contentMarginBottom={contentMarginBottom}
              >
                {label}
              </Content>
            </div>
            {iconClose == true ? (
              <>
                <IconClose
                  iconCloseDisplay={iconCloseDisplay}
                  iconCloseAlignItems={iconCloseAlignItems}
                >
                  <CloseButton type="button" onClick={onClick}>
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: cancelIconName,
                        iconSize: cancelIconSize,
                        iconColor: cancelIconColor,
                      }}
                    />
                  </CloseButton>
                </IconClose>
              </>
            ) : (
              <></>
            )}
          </InnerContainer>
        </Container>
      ) : (
        <>
          <InnerContainer
            innerContainerWidth={innerContainerWidth}
            innerDisplay={innerDisplay}
            innerJustifyContent={innerJustifyContent}
            mainTitleFontSize={mainTitleFontSize}
            mainTitleFontColor={mainTitleFontColor}
            mainTitleFontWeight={mainTitleFontWeight}
          >
            <div>
              {mainTitle}
              <Content
                contentWidth={contentWidth}
                contentDisplay={contentDisplay}
                contentAlignItems={contentAlignItems}
                contentFontSize={contentFontSize}
                contentFontColor={contentFontColor}
                contentFontWeight={contentFontWeight}
                contentMarginBottom={contentMarginBottom}
              >
                {label}
              </Content>
            </div>
            {iconClose == true ? (
              <>
                <IconClose
                  iconCloseDisplay={iconCloseDisplay}
                  iconCloseAlignItems={iconCloseAlignItems}
                >
                  <CloseButton type="button" onClick={onClick}>
                    <Widget
                      src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                      props={{
                        iconName: cancelIconName,
                        iconSize: cancelIconSize,
                        iconColor: cancelIconColor,
                      }}
                    />
                  </CloseButton>
                </IconClose>
              </>
            ) : (
              <></>
            )}
          </InnerContainer>
        </>
      )}
    </AlertStates>
  </>
);
