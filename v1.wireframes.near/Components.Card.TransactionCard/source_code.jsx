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

const cardWidth = props.style.cardWidth ?? "100%";
const cardDisplay = props.style.cardDisplay ?? "flex";
const cardPadding = props.style.Padding ?? "15px 10px 0px";
const cardAlignItems = props.style.cardAlignItems ?? "center";
const cardBorder = props.style.cardBorder ?? "1px solid #00000012";
const cardBorderRadius = props.style.cardBorderRadius ?? "0px";
const cardJustifyContent = props.style.cardJustifyContent ?? "space-between";
const cardBorderBottomWidth = props.style.cardBorderBottomWidth ?? "1px";
const cardBackgroundColor = props.style.cardBackgroundColor ?? "#ececec";

const bodyWidth = props.style.bodyWidth ?? "80%";
const bodyDisplay = props.style.bodyDisplay ?? "flex";
const bodyGap = props.style.bodyGap ?? "10px";

const imageWidth = props.style.imageWidth ?? "40px";
const imageHeight = props.style.imageHeight ?? "40px";
const imageObjectFit = props.style.imageObjectFit ?? "contain";
const imageBorderRadius = props.style.imageBorderRadius ?? "100%";

const titleWidth = props.style.titleWidth ?? "100%";
const titleMinWidth = props.style.titleMinWidth ?? "160px";
const titleFontWeight = props.style.titleFontWeight ?? "600";
const titleFontColor = props.style.titleFontColor ?? "#000";
const titleFontFamily = props.style.titleFontFamily ?? "Mona Sans";
const titleFontSize = props.style.titleFontSize ?? "16px";
const titleMargin = props.style.titleMargin ?? "0px 5px 0px 0px";
const titleWordBreak = props.style.titleWordBreak ?? "break-all";

const containerWidth = props.style.containerWidth ?? "fit-content";
const containerDisplay = props.style.containerDisplay ?? "flex";
const containerJustifyContent = props.style.containerJustifyContent ?? "end";

const contentFontSize = props.style.contentFontSize ?? "28px";
const contentDisplay = props.style.contentDisplay ?? "flex";
const contentAlignItems = props.style.contentAlignItems ?? "end";
const contentFontColor = props.style.contentFontColor ?? "#000";

const spanFontSize = props.style.spanFontSize ?? "20px";
const spanFontWeight = props.style.spanFontWeight ?? "400";
const spanFontColor = props.style.spanFontColor ?? "#A1A09A";
const spanMarginBottom = props.style.spanMarginBottom ?? "4px";
const spanMarginLeft = props.style.spanMarginLeft ?? "2px";

const iconBoxPadding = props.style.iconBoxPadding ?? "10px";
const iconBoxMarginBottom = props.style.iconBoxMarginBottom ?? "1px";

const receiveIconName = props.receiveIconName ?? "arrow-down-left";
const receiveIconSize = props.receiveIconSize ?? "20px";
const receiveIconColor = props.receiveIconColor ?? "#30c730";

const sendIconName = props.sendIconName ?? "arrow-up-right";
const sendIconSize = props.sendIconSize ?? "20px";
const sendIconColor = props.sendIconColor ?? "#e9050d";

const Card = styled.div`
  width: ${cardWidth};
  display: ${cardDisplay};
  padding: ${cardPadding};
  align-items: ${cardAlignItems};
  border: ${cardBorder};
  border-radius: ${cardBorderRadius};
  justify-content: ${cardJustifyContent};
  border-bottom-width: ${cardBorderBottomWidth};
  background-color: ${cardBackgroundColor};
`;
const Body = styled.div`
  width: ${bodyWidth};
  display: ${bodyDisplay};
  gap: ${bodyGap};
`;

const Image = styled.img`
  width: ${imageWidth};
  height: ${imageHeight};
  object-fit: ${imageObjectFit};
  border-radius: ${imageBorderRadius};
`;
const Title = styled.p`
  width: ${titleWidth};
  font-weight: ${titleFontWeight};
  font-family: ${titleFontFamily};
  font-size: ${titleFontSize};
  margin: ${titleMargin};
  word-break: ${titleWordBreak};
  min-width: ${titleMinWidth};
  color: ${titleFontColor};
`;
const Container = styled.div`
  width: ${containerWidth};
  display: ${containerDisplay};
  justify-content: ${containerJustifyContent};
`;
const Content = styled.p`
  font-size: ${contentFontSize};
  display: ${contentDisplay};
  align-items: ${contentAlignItems};
  color: ${contentFontColor};
`;
const Span = styled.span`
  font-size: ${spanFontSize};
  font-weight: ${spanFontWeight};
  color: ${spanFontColor};
  margin-bottom: ${spanMarginBottom};
  margin-left: ${spanMarginLeft};
`;
const IconBox = styled.div`
  padding: ${iconBoxPadding};
  margin-bottom: ${iconBoxMarginBottom};
`;

const isSend = props?.sent;
const amount = props?.amount ?? 0;
const account = props?.accountId ?? "";
const currency = props?.currency ?? "";

return (
  <Card>
    <Body>
      <Image
        src={`https://www.gravatar.com/avatar/${account}?s=150&d=identicon`}
      />
      <div>
        <Title className="d-flex">@{account?.split(".")?.[0]}</Title>
      </div>
    </Body>
    <Container className="d-flex" style={{ alignItems: "center" }}>
      <div className="row">
        <Content
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {amount}
          <Span> {currency}</Span>
        </Content>
      </div>
      <IconBox
        style={{
          display: "contents",
        }}
      >
        {isSend ? (
          <Widget
            src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
            props={{
              iconName: sendIconName,
              iconSize: sendIconSize,
              iconColor: sendIconColor,
            }}
          />
        ) : (
          <Widget
            src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
            props={{
              iconName: receiveIconName,
              iconSize: receiveIconSize,
              iconColor: receiveIconColor,
            }}
          />
        )}
      </IconBox>
    </Container>
  </Card>
);
