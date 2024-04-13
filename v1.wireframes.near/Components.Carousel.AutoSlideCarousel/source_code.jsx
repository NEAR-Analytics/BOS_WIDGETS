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

const itemWidth = props.style.itemWidth ?? "100%";
const itemHeight = props.style.itemHeight ?? "600px";

const imageWidth = props.style.imageWidth ?? "100%";
const imageHeight = props.style.imageHeight ?? "100%";
const imageObjectFit = props.style.imageObjectFit ?? "cover";

const btnBackgroundColor = props.style.btnBackgroundColor ?? "transparent";
const btnBorder = props.style.btnBorder ?? "none";
const btnBorderRadius = props.style.btnBorderRadius ?? "9999px";
const btnFontColor = props.style.btnFontColor ?? "#fff";
const btnPadding = props.style.btnPadding ?? "4px 12px";
const btnPosition = props.style.btnPosition ?? "absolute";
const btnTop = props.style.btnTop ?? "50%";

/* ------------------------------ InlineStyles ------------------------------ */
const carouselWrapperStyle = props.carouselWrapperStyle;
const carouselItemStyle = props.carouselItemStyle;
const carouselImageStyle = props.carouselImageStyle;
const carouselButtonStyle = props.carouselButtonStyle;
/* ------------------------------ InlineStyles ------------------------------ */

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const CarouselItem = styled.div`
  width: ${itemWidth};
  height: ${itemHeight};
  flex-shrink: 0;
`;

const CarouselImage = styled.img`
  width: ${imageWidth};
  height: ${imageHeight};
  object-fit: ${imageObjectFit};
`;

const CarouselButton = styled.button`
  background-color: ${btnBackgroundColor};
  border: ${btnBorder};
  border-radius: ${btnBorderRadius};
  color: ${btnFontColor};
  padding: ${btnPadding};
  position: ${btnPosition};
  top: ${btnTop};
  transform: translateY(-50%);
  cursor: pointer;
  ${({ direction }) => (direction === "left" ? "left: 0;" : "right: 0;")}
`;

const leftIcon = props.arrowLeft;
const rigthIcon = props.arrowRight;

const slides = props.slidesData;
const totalSlides = slides.length;

const [currentIndex, setCurrentIndex] = useState(0);
const nextSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
  );
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
};

useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 4000);

  return () => clearInterval(interval);
}, [totalSlides]); /* -------Re-run effect when currentIndex changes ------ */

return (
  <>
    <CarouselWrapper style={carouselWrapperStyle}>
      <CarouselInner
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <CarouselItem key={index} style={carouselItemStyle}>
            <CarouselImage
              src={slide.image}
              alt={slide.imageAlt}
              style={carouselImageStyle}
            />
          </CarouselItem>
        ))}
      </CarouselInner>
      <CarouselButton
        direction="left"
        onClick={prevSlide}
        style={carouselButtonStyle}
      >
        {leftIcon}
      </CarouselButton>
      <CarouselButton
        direction="right"
        onClick={nextSlide}
        style={carouselButtonStyle}
      >
        {rigthIcon}
      </CarouselButton>
    </CarouselWrapper>
  </>
);
