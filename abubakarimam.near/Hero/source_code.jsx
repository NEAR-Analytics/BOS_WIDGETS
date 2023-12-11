const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  {
    image:
      "https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/a74ebc062c550cfca7690cfcbdbbd77c/detailed",
    text: "Confronting the Problem: A stark reminder of the indiscriminate waste disposal that plagues our environment. Together, we can make a difference.",
  },
  {
    image:
      "https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/c08133aa659a8d76cc0306917bd5cea9/detailed",
    text: "Community Action: Dedicated individuals coming together to clean up our surroundings. Your efforts matter, join us in creating a cleaner world.",
  },
  {
    image:
      "https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/81d8a7d7ac0de4231d5e0da188a6c391/detailed",
    text: "Transformation Achieved: Witness the positive impact of collective responsibility. A clean and thriving environment is within our reach – let's sustain it together.",
  },
  {
    image:
      "https://res-console.cloudinary.com/dzl44lobc/media_explorer_thumbnails/7b9e39cccc58717279fca7bb62ef273a/detailed",
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
  color: white;
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
  color: white;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  width: 100%;`;
const Text = styled.p` 
  font-size: 1.5em;
  margin: 0;
  `;

return (
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
);
