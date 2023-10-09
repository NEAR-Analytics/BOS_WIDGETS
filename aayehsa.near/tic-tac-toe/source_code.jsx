function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();
console.log(messages);

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
};

State.init({
  squares: Array(9).fill(null),
  xIsNext: true,
  newMessage: "",
});

function handleClick(i) {
  const squares = state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";
  State.update({
    squares: squares,
    xIsNext: !state.xIsNext,
  });
}

function renderSquare(i) {
  return (
    <SquareButton onClick={() => handleClick(i)}>
      {state.squares[i]}
    </SquareButton>
  );
}

const winner = calculateWinner(state.squares);
let status;
if (winner) {
  status = "Winner: " + winner;
} else if (state.squares.every((square) => square !== null)) {
  status = "It's a Draw!";
} else {
  status = "Next player: " + (state.xIsNext ? "X" : "O");
}

const SquareButton = styled.button`
  background: #CFD7A9;
  border: 1px solid #999;
  float: left;
  font-size: 55px;
  color:#5E6A19;
  font-weight: bold;
  line-height: 34px;
  height: 65px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 65px;

  &:hover {
    background: grey;
    border-color: grey;
    transform: scale(1.05);
  }
`;

const borderRow = {
  clear: "both",
  content: "",
  display: "table",
};

const body = styled.div`
  .box{
  font-size: 20px;
  font-weight: bold;
  border-radius: 3px;
  padding: 10px 10px;
  cursor: pointer;
  margin: 10px 0;
  transition: background-color 0.3s, border-color 0.3s, transform 0.1s;

  &:hover {
  transform: scale(1.01); 
  }

  
`;
return (
  <body>
    <div>
      <h1 class=" border-red text-red p-3">
        FDAO x GURU Guru Jambheshwar University of Science & Technology{" "}
      </h1>
    </div>
    <div>
      <div
        class="box"
        style={{
          marginBottom: 10,
        }}
      >
        <button
          cla
          className="btn btn-outline-primary btn-sm"
          onClick={() =>
            State.update({
              squares: Array(9).fill(null),
              xIsNext: true,
            })
          }
        >
          Reset Game
        </button>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        {status}
      </div>
      <div style={borderRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div style={borderRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div style={borderRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div class="p-3">
        <br />
        {context.accountId ? (
          <div class=" border-red p-3">
            <div class="row">
              <div>
                <input
                  placeholder="Winner's Name"
                  onChange={(e) => State.update({ newMessage: e.target.value })}
                />
              </div>
            </div>
            <button
              class="btn btn-primary mt-2"
              onClick={async () => {
                addNewMessage();
              }}
            >
              save name
            </button>
          </div>
        ) : (
          <p class="text-center py-2">
            You must login to add the winner in list.
          </p>
        )}
        <br />
        <div class="border border-#FFEFD5 p-3">
          <h3>winners list</h3>
          <table className="table table-sm">
            <thead>
              <tr class="p-2 mb-3 bg-primary text-white text-center weight-bold">
                <th>Account</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((data, key) => {
                return (
                  <tr class="text-center">
                    <td>{data.sender}</td>
                    <td>{data.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
);
