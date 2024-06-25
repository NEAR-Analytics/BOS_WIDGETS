const Game = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const GameBoard = styled.div`
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Square = styled.button`
  background-color: #fff;
  border: 1px solid #999;
  font-size: 48px;
  font-weight: bold;
  line-height: 64px;
  height: 64px;
  width: 64px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 48px;
    height: 48px;
    width: 48px;
  }
`;

const GameInfo = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 0;
    text-align: left;
  }
`;

const Header = styled.div`
  .navbar {
    background-color: #f8f9fa;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .navbar-brand img {
    margin-right: 10px;
  }
`;

const App = () => {
  const initialState = {
    squares: Array(9).fill(null),
    xIsNext: true,
    winner: null,
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
      winner: calculateWinner(squares),
    });
  };

  const renderStatus = () => {
    const winner = state.winner;
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next Player: ${state.xIsNext ? "X" : "O"}`;
    }
  };

  return (
    <>
      <Header>
        <div className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src="https://res.cloudinary.com/dglhc1pfj/image/upload/f_auto,q_auto/v1/samples/lhoetmcicrxlihdcdpou"
                alt=""
                width="50px"
                height="50px"
              />
              Near India
            </a>
          </div>
        </div>
      </Header>
      <Game>
        <GameBoard>
          <Board>
            {state.squares.map((square, i) => (
              <Square key={i} onClick={() => handleClick(i)}>
                {square}
              </Square>
            ))}
          </Board>
        </GameBoard>
        <GameInfo>{renderStatus()}</GameInfo>
      </Game>
    </>
  );
};

return <App />;
