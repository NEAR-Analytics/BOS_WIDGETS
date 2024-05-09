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

const label = props.modalTitle ?? "Modal Title";
const Content = props.content ?? "...";
const isDisable = props.isDisable ?? false;
const inlineStyle = props.inlineStyle;

const dialogWidth = props.style.dialogWidth;
const dialogMinWidth = props.style.dialogMinWidth;
const dialogBorder = props.style.dialogBorder;
const dialogBorderRadius = props.style.dialogBorderRadius;
const dialogHeight = props.style.dialogHeight;
const dialogPosition = props.style.dialogPosition;
const dialogTop = props.style.dialogTop;
const dialogBottom = props.style.dialogBottom;
const dialogLeft = props.style.dialogLeft;
const dialogBackgroundColor = props.style.dialogBackgroundColor;

const contentWidth = props.style.contentWidth;
const contentBorder = props.style.contentBorder;
const contentBorderRadius = props.style.contentBorderRadius;
const contentHeight = props.style.contentHeight;
const contentBackgroundColor = props.style.contentBackgroundColor;

const headerBorder = props.style.headerBorder;
const headerBorderBottom = props.style.headerBorderBottom;
const headerBorderRadius = props.style.headerBorderRadius;
const headerHeight = props.style.headerHeight;
const headerBackgroundColor = props.style.headerBackgroundColor;
const headerDisplay = props.style.headerDisplay;
const headerAlignItems = props.style.headerAlignItems;
const headerJustifyContent = props.style.headerJustifyContent;
const headerMinHeight = props.style.headerMinHeight;
const headerPadding = props.style.headerPadding;

const titleFontColor = props.style.titleFontColor;
const titleFontSize = props.style.titleFontSize;
const titleFontWeight = props.style.titleFontWeight;
const titleFontFamily = props.style.titleFontFamily;

const bodyBorder = props.style.bodyBorder;
const bodyBorderBottom = props.style.bodyBorderBottom;
const bodyBorderRadius = props.style.bodyBorderRadius;
const bodyHeight = props.style.bodyHeight;
const bodyBackgroundColor = props.style.bodyBackgroundColor;
const bodyDisplay = props.style.bodyDisplay;
const bodyAlignItems = props.style.bodyAlignItems;
const bodyJustifyContent = props.style.bodyJustifyContent;
const bodyMinHeight = props.style.bodyMinHeight;
const bodyPadding = props.style.bodyPadding;
const bodyFontColor = props.style.bodyFontColor;
const bodyFontSize = props.style.bodyFontSize;
const bodyFontWeight = props.style.bodyFontWeight;
const bodyFontFamily = props.style.bodyFontFamily;

const footerPadding = props.style.footerPadding;
const showModal = props.showModal;
const setShowModal = props.setShowModal;

const icon = props.icon ?? "x-lg";
const iconSize = props.iconSize ?? "25px";
const iconColor = props.iconColor ?? "#aaa";

const closeBtnBorder = props.style.closeBtnBorder ?? "none";
const closeBtnPadding = props.style.closeBtnPadding ?? "0px 6px";
const closeBtnBorderRadius = props.style.closeBtnBorderRadius ?? "100%";
const closeBtnBackground = props.style.closeBtnBackground ?? "transparent";
const closeBtnActiveBoxShadow = props.style.closeBtnActiveBoxShadow ?? "none";

const ModalContainer = styled.div`
  height: auto;
`;

const ModalDialog = styled.div`
  width: ${(props) => props.dialogWidth || "400px"};
  min-width: ${(props) => props.dialogMinWidth || "300px"};
  border: ${(props) => props.dialogBorder || "none"};
  border-radius: ${(props) => props.dialogBorderRadius || "10px"};
  height: ${(props) => props.dialogHeight || "auto"};
  background: ${(props) => props.dialogBackgroundColor || "#fff"};
  position: ${(props) => props.dialogPosition || "fixed"};
  top: ${(props) => props.dialogTop || "0%"};
  bottom: ${(props) => props.dialogBottom || "100%"};
  left: ${(props) => props.dialogLeft || "50%"};
  transform: translate(-50%, -50%);
  z-index: 10000;
`;

const ModalContent = styled.div`
  width: ${(props) => props.contentWidth || "auto"};
  border: ${(props) => props.contentBorder || "1px solid #000"};
  border-radius: ${(props) => props.contentBorderRadius || "10px"};
  height: ${(props) => props.contentHeight || "auto"};
  background: ${(props) => props.contentBackgroundColor || "#fff"};
`;

const ModalHeader = styled.div`
  border: ${(props) => props.headerBorder || "none"};
  border-bottom: ${(props) => props.headerBorderBottom || "1px solid #ddd"};
  border-radius: ${(props) => props.headerBorderRadius || "10px 10px 0 0"};
  height: ${(props) => props.headerHeight || "auto"};
  background: ${(props) => props.headerBackgroundColor || "#fff"};
  display: ${(props) => props.headerDisplay || "flex"};
  align-items: ${(props) => props.headerAlignItems || "center"};
  justify-content: ${(props) => props.headerJustifyContent || "space-between"};
  min-height: ${(props) => props.headerMinHeight || "65px"};
  padding: ${(props) => props.headerPadding || "0px 10px 0px 10px"};
`;

const ModalTitle = styled.h5`
  color: ${(props) => props.titleFontColor || "#000"};
  font-size: ${(props) => props.titleFontSize || "22px"};
  font-weight: ${(props) => props.titleFontWeight || "500"};
  font-family: ${(props) =>
    props.titleFontFamily ||
    "system-ui, -apple-system, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif;"};
`;

const ModalBody = styled.div`
  border: ${(props) => props.bodyBorder || "none"};
  border-bottom: ${(props) => props.bodyBorderBottom || "1px solid #ddd"};
  border-radius: ${(props) => props.bodyBorderRadius || "none"};
  height: ${(props) => props.bodyHeight || "auto"};
  background: ${(props) => props.bodyBackgroundColor || "#fff"};
  display: ${(props) => props.bodyDisplay || "flex"};
  align-items: ${(props) => props.bodyAlignItems || "center"};
  justify-content: ${(props) => props.bodyJustifyContent || "space-between"};
  min-height: ${(props) => props.bodyMinHeight || "65px"};
  padding: ${(props) => props.bodyPadding || "2px 10px 2px 10px"};
  color: ${(props) => props.bodyFontColor || "#000"};
  font-size: ${(props) => props.bodyFontSize || "16px"};
  font-weight: ${(props) => props.bodyFontWeight || "400"};
  font-family: ${(props) =>
    props.bodyFontFamily ||
    "system-ui, -apple-system, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif;"};
`;

const ModalFooter = styled.div`
  padding: ${(props) => props.footerPadding || "5px 10px 5px 10px"};
`;

const CloseButton = styled.button`
  border: ${closeBtnBorder};
  padding: ${closeBtnPadding};
  background: ${closeBtnBackground};
  border-radius: ${closeBtnBorderRadius};
  :active {
    box-shadow: ${closeBtnActiveBoxShadow};
  }
`;

return (
  <>
    {showModal && (
      <ModalContainer className="show" tabIndex="-1">
        <ModalDialog
          dialogWidth={dialogWidth}
          dialogMinWidth={dialogMinWidth}
          dialogBorder={dialogBorder}
          dialogBorderRadius={dialogBorderRadius}
          dialogHeight={dialogHeight}
          dialogBackgroundColor={dialogBackgroundColor}
          dialogPosition={dialogPosition}
          dialogTop={dialogTop}
          dialogLeft={dialogLeft}
        >
          <ModalContent
            contentWidth={contentWidth}
            contentBorder={contentBorder}
            contentBorderRadius={contentBorderRadius}
            contentHeight={contentHeight}
            contentBackgroundColor={contentBackgroundColor}
          >
            <ModalHeader
              headerBorder={headerBorder}
              headerBorderBottom={headerBorderBottom}
              headerBorderRadius={headerBorderRadius}
              headerHeight={headerHeight}
              headerBackgroundColor={headerBackgroundColor}
              headerDisplay={headerDisplay}
              headerAlignItems={headerAlignItems}
              headerJustifyContent={headerJustifyContent}
              headerMinHeight={headerMinHeight}
              headerPadding={headerPadding}
            >
              <ModalTitle
                titleFontColor={titleFontColor}
                titleFontSize={titleFontSize}
                titleFontWeight={titleFontWeight}
                titleFontFamily={titleFontFamily}
              >
                {label}
              </ModalTitle>
              <CloseButton type="button" onClick={() => setShowModal(false)}>
                <Widget
                  src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                  props={{
                    iconName: icon,
                    iconSize: iconSize,
                    iconColor: iconColor,
                  }}
                />
              </CloseButton>
            </ModalHeader>
            <ModalBody
              className="modal-body"
              bodyBorder={bodyBorder}
              bodyBorderBottom={bodyBorderBottom}
              bodyBorderRadius={bodyBorderRadius}
              bodyHeight={bodyHeight}
              bodyBackgroundColor={bodyBackgroundColor}
              bodyDisplay={bodyDisplay}
              bodyAlignItems={bodyAlignItems}
              bodyJustifyContent={bodyJustifyContent}
              bodyMinHeight={bodyMinHeight}
              bodyPadding={bodyPadding}
              bodyFontColor={bodyFontColor}
              bodyFontSize={bodyFontSize}
              bodyFontWeight={bodyFontWeight}
              bodyFontFamily={bodyFontFamily}
            >
              {Content}
            </ModalBody>
            {/* ------------------------------ Modal Footer ------------------------------ */}
            <ModalFooter className="modal-footer" footerPadding={footerPadding}>
              <Widget
                src="v1.wireframes.near/widget/Components.Button.SimpleButton"
                props={{
                  buttonTitle: "Cancel",
                  type: "button",
                  style: {
                    padding: "10px",
                    width: "82px",
                    minWidth: "0px",
                    backgroundColor: "#dc3545",
                    activeColor: "#ab1f2c",
                    hoverColor: "#ab1f2c",
                    fontColor: "#fff",
                  },
                  inlineStyle: {
                    marginRight: "10px",
                  },
                  onClick: () => {
                    setShowModal(false);
                  },
                }}
              />
              <Widget
                src="v1.wireframes.near/widget/Components.Button.SimpleButton"
                props={{
                  buttonTitle: "Save changes",
                  type: "button",
                  style: {
                    padding: "10px",
                    minWidth: "118px",
                    width: "118px",
                    backgroundColor: "#4CAF50",
                    activeColor: "#2f7332",
                    hoverColor: "#2f7332",
                    fontColor: "#fff",
                  },
                  onClick: () => {
                    setShowModal(false);
                  },
                }}
              />
            </ModalFooter>
            {/* ------------------------------ Modal Footer ------------------------------ */}
          </ModalContent>
        </ModalDialog>
      </ModalContainer>
    )}
  </>
);
