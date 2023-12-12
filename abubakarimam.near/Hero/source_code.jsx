const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  {
    image:
      "https://res.cloudinary.com/dzl44lobc/image/upload/v1702289858/uozxuxbwnzpdndf8dd19.jpg",
    text: "Confronting the Problem: A stark reminder of the indiscriminate waste disposal that plagues our environment. Together, we can make a difference.",
  },
  {
    image:
      "https://res.cloudinary.com/dzl44lobc/image/upload/v1702289858/npgotntgozmsawctbuqo.jpg",
    text: "Community Action: Dedicated individuals coming together to clean up our surroundings. Your efforts matter, join us in creating a cleaner world.",
  },
  {
    image:
      "https://res.cloudinary.com/dzl44lobc/image/upload/v1702290107/pdsmcqfdltuzzxkgnxle.jpg",
    text: "Transformation Achieved: Witness the positive impact of collective responsibility. A clean and thriving environment is within our reach – let's sustain it together.",
  },
  {
    image:
      "https://res.cloudinary.com/dzl44lobc/image/upload/v1702290943/bfu4ob2nj7my2ejxz97g.jpg",
    text: "Embrace Recycling: The symbol of a sustainable future. Contribute to the cycle of reuse and reduce waste. Be a part of the recycling revolution.",
  },
];

const nextSlide = () => {
  setCurrentSlide((prevSlide) =>
    prevSlide === slides.length - 1 ? 0 : prevSlide + 1
  );
};

const prevSlide = () => {
  setCurrentSlide((prevSlide) =>
    prevSlide === 0 ? slides.length - 1 : prevSlide - 1
  );
};

const SectionWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 50px 0;
  text-align: center;
`;

const SliderContainer = styled.div`
   position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  `;
const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2em;
  color: #4caf50;;
  cursor: pointer;
  outline: none;
  left: 10px;
  `;
const NextButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2em;
  color: #4caf50;;
  cursor: pointer;
  outline: none;
  right: 10px;
  `;
const Slide = styled.div`
  position: relative;
  `;
const SlideImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  `;
const TextOverlay = styled.div`position: absolute;
   position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  width: 50%;`;
const Text = styled.p` 
  font-size: 16px;
  margin: 0;
  `;

return (
  <SectionWrapper>
    <SliderContainer>
      <PrevButton onClick={prevSlide}>&#9664;</PrevButton>
      <Slide>
        <SlideImage
          src={slides[currentSlide].image}
          alt={`Slide ${currentSlide + 1}`}
        />
        <TextOverlay>
          <Text>{slides[currentSlide].text}</Text>
        </TextOverlay>
      </Slide>
      <NextButton onClick={nextSlide}>&#9654;</NextButton>
    </SliderContainer>
  </SectionWrapper>
);
