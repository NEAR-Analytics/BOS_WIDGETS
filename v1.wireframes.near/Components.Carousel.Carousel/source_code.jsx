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

/* ----------------------------- CarouselWrapper ---------------------------- */
const carouselWrapperWidth = props.style.carouselWrapperWidth ?? "100%";
const carouselWrapperHeight = props.style.carouselWrapperHeight ?? "600px";
const carouselWrapperMaxHeight = props.style.carouselWrapperMaxHeight ?? "100%";
const carouselWrapperOverflow = props.style.carouselWrapperOverflow ?? "hidden";
const carouselWrapperPosition =
  props.style.carouselWrapperPosition ?? "relative";
/* ----------------------------- CarouselWrapper ---------------------------- */

/* ------------------------------ CarouselInner ----------------------------- */
const carouselInnerDisplay = props.style.carouselInnerDisplay ?? "flex";
/* ------------------------------ CarouselInner ----------------------------- */

/* ------------------------------ CarouselItem ------------------------------ */
const carouselItemWidth = props.style.carouselItemWidth ?? "100%";
const carouselItemOverflow = props.style.carouselItemOverflow ?? "hidden";
const carouselItemDisplay = props.style.carouselItemDisplay ?? "flex";
const carouselItemJustifyContent =
  props.style.carouselItemJustifyContent ?? "center";
const carouselItemAlignItems = props.style.carouselItemAlignItems ?? "center";
const carouselItemBackgroundColor =
  props.style.carouselItemBackgroundColor ?? "#000";
/* ------------------------------ CarouselItem ------------------------------ */

/* ------------------------------ CarouselImage ----------------------------- */
const carouselImageWidth = props.style.carouselImageWidth ?? "100%";
const carouselImageHeight = props.style.carouselImageHeight ?? "600px";
const carouselImageObjectFit = props.style.carouselImageObjectFit ?? "contain";
/* ------------------------------ CarouselImage ----------------------------- */

/* ----------------------------- CarouselButton ----------------------------- */
const carouselButtonBackgroundColor =
  props.style.carouselButtonBackgroundColor ?? "rgb(255 255 255 / 26%)";
const carouselButtonBorder = props.style.carouselButtonBorder ?? "none";
const carouselButtonBorderRadius =
  props.style.carouselButtonBorderRadius ?? "9999px";
const carouselButtonFontColor = props.style.carouselButtonFontColor ?? "#fff";
const carouselButtonPadding = props.style.carouselButtonPadding ?? "6px 6px";
const carouselButtonPosition = props.style.carouselButtonPosition ?? "absolute";
const carouselButtonTop = props.style.carouselButtonTop ?? "50%";
const carouselButtonLineHeight = props.style.carouselButtonLineHeight ?? "0px";
/* ----------------------------- CarouselButton ----------------------------- */

/* ----------------------------- Styles ----------------------------- */
const carouselWrapperStyle = props.carouselWrapperStyle;
const carouselItemStyle = props.carouselItemStyle;
const carouselImageStyle = props.carouselImageStyle;
const carouselIButtonStyle = props.carouselIButtonStyle;
/* ----------------------------- Styles ----------------------------- */

const CarouselWrapper = styled.div`
  width: ${carouselWrapperWidth};
  height: ${carouselWrapperHeight};
  max-height: ${carouselWrapperMaxHeight};
  overflow: ${carouselWrapperOverflow};
  position: ${carouselWrapperPosition};
`;

const CarouselInner = styled.div`
  display: ${carouselInnerDisplay};
  transition: transform 0.5s ease;
`;

const CarouselItem = styled.div`
  width: ${carouselItemWidth};
  flex-shrink: 0;
  overflow: ${carouselItemOverflow};
  display: ${carouselItemDisplay};
  justify-content: ${carouselItemJustifyContent};
  align-items: ${carouselItemAlignItems};
  background-color: ${carouselItemBackgroundColor};
`;

const CarouselImage = styled.img`
  width: ${carouselImageWidth};
  height: ${carouselImageHeight};
  object-fit: ${carouselImageObjectFit};
`;

const CarouselButton = styled.button`
  background-color: ${carouselButtonBackgroundColor};
  border: ${carouselButtonBorder};
  border-radius: ${carouselButtonBorderRadius};
  color: ${carouselButtonFontColor};
  padding: ${carouselButtonPadding};
  position: ${carouselButtonPosition};
  top: ${carouselButtonTop};
  transform: translateY(-50%);
  line-height: ${carouselButtonLineHeight};
  cursor: pointer;
  ${({ direction }) => (direction === "left" ? "left: 0;" : "right: 0;")}
`;

const leftIcon = props.arrowLeft;
const rigthIcon = props.arrowRight;

const imgSlide = props.images;

const [currentIndex, setCurrentIndex] = useState(0);

const nextSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === imgSlide.length - 1 ? 0 : prevIndex + 1
  );
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? imgSlide.length - 1 : prevIndex - 1
  );
};

return (
  <>
    <CarouselWrapper style={carouselWrapperStyle}>
      <CarouselInner
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imgSlide.map((image, index) => (
          <CarouselItem key={index} style={carouselItemStyle}>
            <CarouselImage
              src={image.imageUrl}
              alt={image.imageAlt}
              style={carouselImageStyle}
            />
          </CarouselItem>
        ))}
      </CarouselInner>
      <CarouselButton
        direction="left"
        onClick={prevSlide}
        style={carouselIButtonStyle}
      >
        {leftIcon}
      </CarouselButton>
      <CarouselButton
        direction="right"
        onClick={nextSlide}
        style={carouselIButtonStyle}
      >
        {rigthIcon}
      </CarouselButton>
    </CarouselWrapper>
  </>
);
