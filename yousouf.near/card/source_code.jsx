const generateCards = () => {
  const icons = ["🌟", "🚀", "🌈", "🎈", "⭐", "🌺", "🍕", "🎉"];
  const duplicatedIcons = [...icons, ...icons];
  return duplicatedIcons.sort(() => Math.random() - 0.5);
};

const [cards, setCards] = useState(generateCards());
const [flippedIndices, setFlippedIndices] = useState([]);
const [matchedPairs, setMatchedPairs] = useState([]);
const [score, setScore] = useState(0);
const [point, setPoint] = useState(0);
const [levelCompleted, setLevelCompleted] = useState(false);

useEffect(() => {
  if (flippedIndices.length === 2) {
    const [firstIndex, secondIndex] = flippedIndices;

    if (cards[firstIndex] === cards[secondIndex]) {
      setMatchedPairs((prevMatchedPairs) => [
        ...prevMatchedPairs,
        cards[firstIndex],
      ]);

      // Increment the score and check if all cards are matched
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore === cards.length / 2) {
          setLevelCompleted(true);

          // Reset the game for the next level after a delay
          setTimeout(() => {
            setCards(generateCards());
            setFlippedIndices([]);
            setMatchedPairs([]);
            setScore(newScore);
            setLevelCompleted(false);
          }, 2000);
        }
        return newScore;
      });

      // Reset flipped indices after checking for a match
      setTimeout(() => setFlippedIndices([]), 1000);
    } else {
      // Reset flipped indices after checking for a non-match
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }
}, [flippedIndices, cards]);

const handleClick = (index) => {
  if (
    flippedIndices.length === 2 ||
    flippedIndices.includes(index) ||
    matchedPairs.includes(cards[index]) ||
    levelCompleted
  ) {
    return;
  }

  setFlippedIndices((prevFlippedIndices) => [...prevFlippedIndices, index]);
};

const cardStyle = {
  width: "100px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  cursor: "pointer",
  backgroundColor: "#333",
  borderRadius: "8px",
  color: "#fff",
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
  margin: "5px",
  userSelect: "none",
};

const flippedCardStyle = {
  ...cardStyle,
  backgroundColor: "#555",
  transform: "scale(1.02)",
};

const darkBackground = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  color: "#fff",
};

return (
  <div style={darkBackground}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 100px)",
        gridGap: "10px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          style={
            flippedIndices.includes(index) || matchedPairs.includes(card)
              ? flippedCardStyle
              : cardStyle
          }
        >
          {flippedIndices.includes(index) || matchedPairs.includes(card)
            ? card
            : "❓"}
        </div>
      ))}
    </div>

    {levelCompleted && (
      <div style={{ marginTop: "20px", fontSize: "24px" }}>
        Level Completed! Next Level Loading...
      </div>
    )}
    {!levelCompleted && (
      <div style={{ marginTop: "20px", fontSize: "24px" }}>Points: {score}</div>
    )}
    {score >= 16 ? <Widget src={`yousouf.near/widget/nft`} /> : ""}
  </div>
);
