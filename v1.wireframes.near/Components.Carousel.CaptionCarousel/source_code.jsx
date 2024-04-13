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

const slideWidth = props.style.slideWidth ?? "100%";
const slideHeight = props.style.slideHeight ?? "600px";

const slideImageWidth = props.style.slideImageWidth ?? "100%";
const slideImageHeight = props.style.slideImageHeight ?? "100%";
const slideImageObjectFit = props.style.slideImageObjectFit ?? "cover";

const contentPosition = props.style.contentPosition ?? "absolute";
const contentTop = props.style.contentTop ?? "50%";
const contentLeft = props.style.contentLeft ?? "50%";
const contentTextAlign = props.style.contentTextAlign ?? "center";
const contentBackgroundColor =
  props.style.contentBackgroundColor ?? "#fff6f645";
const contentMinHeight = props.style.contentMinHeight ?? "200px";
const contentWidth = props.style.contentWidth ?? "60%";
const contentHeight = props.style.contentHeight ?? "300px";
const contentDisplay = props.style.contentDisplay ?? "flex";
const contentAlignItems = props.style.contentAlignItems ?? "center";
const contentJustifyContent = props.style.contentJustifyContent ?? "center";
const contentBorder = props.style.contentBorder ?? "2px solid #ffffff00";
const contentBorderRadius = props.style.contentBorderRadius ?? "20px";

const rowWidth = props.style.rowWidth ?? "100%";

const headingMargin = props.style.headingMargin ?? "0px";
const headingFontColor = props.style.headingFontColor ?? "#000";
const headingFontSize = props.style.headingFontSize ?? "xxx-large";
const headingFontFamily = props.style.headingFontFamily ?? "Mona Sans";
const headingFontWeight = props.style.headingFontWeight ?? "400";
const headingTextAlign = props.style.headingTextAlign ?? "center";

const textMargin = props.style.textMargin ?? "5px 0 0";
const textFontSize = props.style.textFontSize ?? "16px";
const textFontColor = props.style.textFontColor ?? "#000";
const textFontFamily = props.style.textFontFamily ?? "Mona Sans";
const textFontWeight = props.style.textFontWeight ?? "400";
const textPadding = props.style.textPadding ?? "0px 10px";
const textTextAlign = props.style.textTextAlign ?? "center";

/* ------------------------------ InlineStyles ------------------------------ */
const carouselContainerStyle = props.carouselContainerStyle;
const carouselSlideStyle = props.carouselSlideStyle;
const slideImageStyle = props.slideImageStyle;
const slideContentStyle = props.slideContentStyle;
const slideRowStyle = props.slideRowStyle;
const slideHeadingStyle = props.slideHeadingStyle;
const slideTextStyle = props.slideTextStyle;
/* ------------------------------ InlineStyles ------------------------------ */

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Carousel = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  width: ${slideWidth};
  height: ${slideHeight};
  flex-shrink: 0;
  position: relative;
`;

const SlideImage = styled.img`
  width: ${slideImageWidth};
  height: ${slideImageHeight};
  object-fit: ${slideImageObjectFit};
`;

const SlideContent = styled.div`
  position: ${contentPosition};
  top: ${contentTop};
  left: ${contentLeft};
  transform: translate(-50%, -50%);
  text-align: ${contentTextAlign};
  background-color: ${contentBackgroundColor};
  min-height: ${contentMinHeight};
  width: ${contentWidth};
  height: ${contentHeight};
  display: ${contentDisplay};
  align-items: ${contentAlignItems};
  justify-content: ${contentJustifyContent};
  border: ${contentBorder};
  border-radius: ${contentBorderRadius};
`;

const Row = styled.div`
  width: ${rowWidth};
`;
const SlideHeading = styled.h2`
  margin: ${headingMargin};
  color: ${headingFontColor};
  font-size: ${headingFontSize};
  font-family: ${headingFontFamily};
  font-weight: ${headingFontWeight};
  text-align: ${headingTextAlign};
`;

const SlideText = styled.p`
  margin: ${textMargin};
  font-size: ${textFontSize};
  color: ${textFontColor};
  font-family: ${textFontFamily};
  font-weight: ${textFontWeight};
  padding: ${textPadding};
  text-align: ${textTextAlign};
`;

const slides = props.slidesData;
const [currentIndex, setCurrentIndex] = useState(0);
const totalSlides = slides.length;

useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  }, 3000); // Auto-slide every 3 seconds

  return () => clearInterval(intervalId);
}, [totalSlides]);

const nextSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
  );
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
  );
};

return (
  <>
    <CarouselContainer style={carouselContainerStyle}>
      <Carousel style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index} style={carouselSlideStyle}>
            <SlideImage
              src={slide.image}
              alt={slide.imageAlt}
              style={slideImageStyle}
            />
            <SlideContent style={slideContentStyle}>
              <Row style={slideRowStyle}>
                <SlideHeading style={slideHeadingStyle}>
                  {slide.title}
                </SlideHeading>
                <SlideText style={slideTextStyle}>{slide.text}</SlideText>
              </Row>
            </SlideContent>
            <Row></Row>
          </Slide>
        ))}
      </Carousel>
    </CarouselContainer>
  </>
);
