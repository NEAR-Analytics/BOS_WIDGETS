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

const cardMaxWidth = props.style.cardMaxWidth ?? "345px";
const cardBorder = props.style.cardBorder ?? "2px solid #b4b4b4fc";
const cardBorderRadius = props.style.cardBorderRadius ?? "15px";
const cardPadding = props.style.cardPadding ?? "0px";
const cardBackgroundColor = props.style.cardBackgroundColor ?? "#eee";

const imageHeight = props.style.imageHeight ?? "170px";
const imageWidth = props.style.imageWidth ?? "100%";
const imageObjectFit = props.style.imageObjectFit ?? "cover";
const imageBorder = props.style.imageBorder ?? "none";
const imageBorderRadius = props.style.imageBorderRadius ?? "12px 12px 0px 0px";

const cardBodyMargin = props.style.cardBodyMargin ?? "0px";
const cardBodyPadding = props.style.cardBodyPadding ?? "5px";

const titleFontSize = props.style.titleFontSize ?? "1.25rem";
const titleFontColor = props.style.titleFontColor ?? "#000";
const titleFontWeight = props.style.titleFontWeight ?? "600";
const titleFontStyle = props.style.titleFontStyle ?? "normal";
const titleFontFamily = props.style.titleFontFamily ?? "Mona Sans";
const titleTextAlign = props.style.titleTextAlign ?? "start";

const contentFontSize = props.style.contentFontSize ?? "16px";
const contentFontColor = props.style.contentFontColor ?? "#000";
const contentFontWeight = props.style.contentFontWeight ?? "400";
const contentFontStyle = props.style.contentFontStyle ?? "normal";
const contentFontFamily = props.style.contentFontFamily ?? "Mona Sans";
const contentTextAlign = props.style.contentTextAlign ?? "start";
const contentMargin = props.style.contentMargin ?? "0px 0px";

const cardFooterPadding = props.style.cardFooterPadding ?? "5px";
const cardFooterTextAlign = props.style.cardFooterTextAlign ?? "start";
const cardFooterBorderRadius = props.style.cardFooterBorderRadius ?? "0px 0px 15px 15px ";
const cardFooterBackgroundColor =
  props.style.cardFooterBackgroundColor ?? "#eee";

/* ------------------------------- Image Card ------------------------------- */
const Card = styled.div`
  max-width: ${cardMaxWidth};
  border: ${cardBorder};
  border-radius: ${cardBorderRadius};
  padding: ${cardPadding};
  background-color: ${cardBackgroundColor};
`;

const CardImage = styled.img`
  height: ${imageHeight};
  width: -webkit-fill-available;
  width: ${imageWidth};
  object-fit: ${imageObjectFit};
  border-radius: ${imageBorderRadius};
  border: ${imageBorder};
`;

const CardBody = styled.div`
  margin: ${cardBodyMargin};
  padding: ${cardBodyPadding};
`;

const CardTitle = styled.h5`
  font-size: ${titleFontSize};
  color: ${titleFontColor};
  font-weight: ${titleFontWeight};
  font-style: ${titleFontStyle};
  font-family: ${titleFontFamily};
  text-align: ${titleTextAlign};
`;

const Content = styled.p`
  font-size: ${contentFontSize};
  color: ${contentFontColor};
  font-weight: ${contentFontWeight};
  font-style: ${contentFontStyle};
  font-family: ${contentFontFamily};
  text-align: ${contentTextAlign};
  margin: ${contentMargin};
`;

const CardFooter = styled.div`
  padding: ${cardFooterPadding};
  text-align: ${cardFooterTextAlign};
  background-color: ${cardFooterBackgroundColor};
  border-radius: ${cardFooterBorderRadius};
`;

const cardData = props.data;
return (
  <Card>
    {cardData.map((data) => (
      <>
        <CardImage src={data.imageUrl} alt={data.imageAlt} />
        <CardBody>
          <CardTitle>{data.title}</CardTitle>
          <Content>{data.content}</Content>
        </CardBody>
        <CardFooter>
          {data.btnShare}
          {data.btnLearnMore}
        </CardFooter>
      </>
    ))}
  </Card>
);
