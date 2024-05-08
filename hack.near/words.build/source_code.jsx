const words = [
  "projects",
  "tools",
  "solutions",
  "teams",
  "dreams",
  "visions",
  "systems",
  "ecosystems",
  "commons",
  "futures",
];

const [currentIndex, setCurrentIndex] = useState(0);
const [currentWord, setCurrentWord] = useState(words[0]);

useEffect(() => {
  const intervalId = setInterval(() => {
    // Update the index cyclically
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentIndex(nextIndex);
    setCurrentWord(words[nextIndex]);
  }, 2000); // Changes every 2 seconds

  return () => clearInterval(intervalId);
}, [currentIndex, words]);

return (
  <div className="m-2">
    <h2 style={{ fontFamily: "Courier, sans-serif" }}>
      Let's build <b style={{ textDecoration: "underline" }}>{currentWord}</b>.
    </h2>
  </div>
);
