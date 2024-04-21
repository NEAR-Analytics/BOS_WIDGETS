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
const cardHeight = props.style.cardHeight ?? "100vh";
const cardMaxWidth = props.style.cardMaxWidth ?? "100%";
const cardBorder = props.style.cardBorder ?? "0";
const cardBorderRadius = props.style.cardBorderRadius ?? "0";
const cardPadding = props.style.cardPadding ?? "0px";
const cardBackgroundColor = props.style.cardBackgroundColor ?? "red";
const cardOverflow = props.style.cardOverflow ?? "hidden";

const imageHeight = props.style.imageHeight ?? "100%";
const imageWidth = props.style.imageWidth ?? "100vw";
const imageObjectFit = props.style.imageObjectFit ?? "cover";
const imageBorder = props.style.imageBorder ?? "none";
const imageBorderRadius = props.style.imageBorderRadius ?? "0px 0px 0px 0px";


const logoHeight = props.style.logoHeight ?? "150px";
const logoWidth = props.style.logoWidth ?? "160px";
const logoBorder = props.style.logoBorder ?? "2px solid #fff";
const logoBorderRadius = props.style.logoBorderRadius ?? "60%";
const logoPadding = props.style.logoPadding ?? "0";

const boxPosition = props.style.boxPosition ?? "absolute";
const boxTop = props.style.boxTop ?? "50%";
const boxLeft = props.style.boxLeft ?? "50%";
const boxTextAlign = props.style.boxTextAlign ?? "center";
const boxBackgroundColor = props.style.boxBackgroundColor ?? "#100f0fab";
const boxMinHeight = props.style.boxMinHeight ?? "200px";
const boxWidth = props.style.boxWidth ?? "100%";
const boxHeight = props.style.boxHeight ?? "100vh";
const boxDisplay = props.style.boxDisplay ?? "flex";
const boxAlignItems = props.style.boxAlignItems ?? "center";
const boxJustifybox = props.style.boxJustifybox ?? "center";
const boxBorder = props.style.boxBorder ?? "0px";
const boxBorderRadius = props.style.boxBorderRadius ?? "0px";

/* ------------------------------- Image Card ------------------------------- */
const Card = styled.div`
  width: ${cardWidth};
  height: ${cardHeight};
  max-width: ${cardMaxWidth};
  border: ${cardBorder};
  border-radius: ${cardBorderRadius};
  padding: ${cardPadding};
  background-color: ${cardBackgroundColor};
  overflow: ${cardOverflow};
`;

const CardImage = styled.img`
  height: ${imageHeight};
  width: -webkit-fill-available;
  width: ${imageWidth};
  object-fit: ${imageObjectFit};
  border-radius: ${imageBorderRadius};
  border: ${imageBorder};
`;
const Logo = styled.img`
height: ${logoHeight};
width: ${logoWidth};
border-radius: ${logoBorderRadius};
border: ${logoBorder};
padding: ${logoPadding};
`;
/* ------------------------------- Box Starts ------------------------------- */

const Box = styled.div`
  position: ${boxPosition};
  top: ${boxTop};
  left: ${boxLeft};
  transform: translate(-50%, -50%);
  text-align: ${boxTextAlign};
  background-color: ${boxBackgroundColor};
  min-height: ${boxMinHeight};
  width: ${boxWidth};
  height: ${boxHeight};
  display: ${boxDisplay};
  align-items: ${boxAlignItems};
  justify-box: ${boxJustifybox};
  border: ${boxBorder};
  border-radius: ${boxBorderRadius};
`;

/* ----------------------------- Our Partner end ---------------------------- */

const cardData = props.data;
return (
  <Card>
    {cardData?.map((data) => (
      <>
        <CardImage src={data?.imageUrl} alt={data?.imageAlt} />
        <Box>
          <div
            className="row d-flex justify-content-center"
            style={{ paddingTop: "inherit", width: "-webkit-fill-available" }}
          >
            <div className="pt-5 row d-flex justify-content-center">
              <Logo src={data?.logoUrl}/>
            </div>
            <p
              className="d-flex justify-content-center mt-4 p-4"
              style={{ color: "#fff" }}
            >
              {data?.content}
            </p>
            <hr className="mt-5" style={{ color: "#ddd" }} />
            {data?.ourPartner}
          </div>
        </Box>
      </>
    ))}
  </Card>
);
