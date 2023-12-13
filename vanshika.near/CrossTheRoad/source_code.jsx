const RoadCrosserGame = () => {
  const [characterPosition, setCharacterPosition] = useState(40);
  const [gameOver, setGameOver] = useState(false);
  const [roads, setRoads] = useState([
    { top: 200, carPosition: 50, cars: [0] },
    { top: 300, carPosition: 30, cars: [0] },
    { top: 400, carPosition: 70, cars: [0] },
  ]);

  const characterStyle = {
    position: "absolute",
    left: "50%",
    bottom: `${characterPosition}px`,
    transform: "translateX(-50%)",
    width: "30px",
    height: "30px",
    backgroundColor: "red",
  };

  const roadStyle = {
    position: "absolute",
    left: "0",
    width: "100%",
    height: "50px",
    backgroundColor: "gray",
  };

  const carStyle = {
    position: "absolute",
    width: "30px",
    height: "30px",
  };

  const handleMoveForward = () => {
    if (!gameOver) {
      setCharacterPosition(characterPosition + 10);
    }
  };

  const handleMoveBackward = () => {
    if (!gameOver && characterPosition > 0) {
      setCharacterPosition(characterPosition - 10);
    }
  };

  const restartGame = () => {
    setCharacterPosition(40);
    setGameOver(false);
    setRoads([
      { top: 200, carPosition: 50, cars: [0] },
      { top: 300, carPosition: 30, cars: [0] },
      { top: 400, carPosition: 70, cars: [0] },
    ]);
  };

  const moveCars = () => {
    setRoads((prevRoads) =>
      prevRoads.map((road) => {
        const newCars = road.cars.map((pos) =>
          pos >= 100 ? road.cars.length * 10 : pos + 1
        );
        return { ...road, cars: newCars };
      })
    );
  };

  useEffect(() => {
    const gameInterval = setInterval(() => {
      moveCars();

      // Check for collision with cars
      const isCollision = roads.some((road) =>
        road.cars.some(
          (pos) =>
            characterPosition <= road.top + 30 &&
            characterPosition + 30 >= road.top &&
            road.carPosition + pos >= 50 &&
            road.carPosition + pos <= 80
        )
      );

      if (isCollision) {
        setGameOver(true);
      }

      // Check for successful crossing
      if (characterPosition >= 500) {
        const allRoadsCrossed = roads.every(
          (road) => characterPosition >= road.top + 30
        );
        if (allRoadsCrossed) {
          setGameOver(true);
        }
      }

      // Clear interval if the game is over
      if (gameOver) {
        clearInterval(gameInterval);
      }
    }, 100);

    return () => {
      clearInterval(gameInterval);
    };
  }, [characterPosition, roads, gameOver]);

  return (
    <div>
      {roads.map((road, index) => (
        <div key={index} style={{ ...roadStyle, top: `${road.top}px` }}>
          {road.cars.map((pos, carIndex) => (
            <div
              key={carIndex}
              style={{
                ...carStyle,
                left: `${road.carPosition + pos}%`,
                backgroundColor: carIndex % 2 === 0 ? "blue" : "green",
              }}
            ></div>
          ))}
        </div>
      ))}
      <div style={characterStyle}></div>
      {gameOver ? (
        <div>
          <p>{characterPosition >= 500 ? "You Won!" : "Game Over"}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <div>
          <button onClick={handleMoveBackward}>Move Backward</button>
          <button onClick={handleMoveForward}>Move Forward</button>
        </div>
      )}
    </div>
  );
};

return <RoadCrosserGame />;
