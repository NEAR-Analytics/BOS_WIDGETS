const generateCards = () => {
  const icons = ["🌟", "🚀", "🌈", "🎈", "⭐", "🌺", "🍕", "🎉"];
  const duplicatedIcons = [...icons, ...icons];
  return duplicatedIcons.sort(() => Math.random() - 0.5);
};

const [cards, setCards] = useState(generateCards());
const [flippedIndices, setFlippedIndices] = useState([]);
const [matchedPairs, setMatchedPairs] = useState([]);
const [score, setScore] = useState(0);

useEffect(() => {
  if (flippedIndices.length === 2) {
    const [firstIndex, secondIndex] = flippedIndices;

    if (cards[firstIndex] === cards[secondIndex]) {
      setMatchedPairs((prevMatchedPairs) => [
        ...prevMatchedPairs,
        cards[firstIndex],
      ]);
      setScore((prevScore) => prevScore + 1);
    }

    // Reset flipped indices after checking for a match
    setTimeout(() => setFlippedIndices([]), 1000);
  }
}, [flippedIndices, cards]);

const handleClick = (index) => {
  if (
    flippedIndices.length === 2 ||
    flippedIndices.includes(index) ||
    matchedPairs.includes(cards[index])
  ) {
    return;
  }

  setFlippedIndices([...flippedIndices, index]);
};

const cardStyle = {
  width: "100px",
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  cursor: "pointer",
  backgroundColor: "#ccc",
  borderRadius: "8px",
  color: "#ccc",
};

const flippedCardStyle = {
  ...cardStyle,
  backgroundColor: "#ffe",
};

const darkBackground = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  color: "#ffe",
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
    <div style={{ marginTop: "20px", fontSize: "18px" }}>Score: {score}</div>
  </div>
);
