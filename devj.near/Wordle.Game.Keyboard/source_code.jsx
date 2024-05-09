const Keyboard = () => {
  return (
    <div class="keyboard rounded px-4 py-2 shadow">
      <Row>
        <Keys value="qwertyuiop" />
      </Row>
      <Row>
        <div class="col-1"></div>
        <Keys value="asdfghjkl" />
        <div class="col-1"></div>
      </Row>
      <Row>
        <Enter />
        <Keys value="zxcvbnm" />
        <Delete />
      </Row>
    </div>
  );
};

const Row = ({ children }) => <div class="row">{children}</div>;

const Keys = ({ value }) => {
  return (
    <>
      {Array.from(value).map((k) => (
        <Key key={k} value={k} />
      ))}
    </>
  );
};

const Key = ({ value }) => {
  const usedKeys = getUsedKeys();
  const hit = usedKeys[value];
  return (
    <div
      class={`key ${hitStyle[hit ? hit : 0]}`}
      onClick={() => props.handleKeys(value)}
    >
      {value}
    </div>
  );
};

const Enter = () => (
  <div class="enter rounded" onClick={() => props.handleKeys("Enter")}>
    ENTER
  </div>
);

const Delete = () => (
  <div class="delete rounded" onClick={() => props.handleKeys("Backspace")}>
    DEL
  </div>
);

const getUsedKeys = () => {
  const flatGuesses = props.guesses.flat(1);
  let formattedUsedKeys = {};
  flatGuesses.forEach((l) => {
    const key = l.key;
    const hit = l.hit;
    if (formattedUsedKeys[key]) {
      if (formattedUsedKeys[key] < hit) formattedUsedKeys[key] = hit;
    } else formattedUsedKeys[key] = hit;
  });
  return formattedUsedKeys;
};

const hitStyle = {
  0: "hit-0",
  1: "hit-1",
  2: "hit-2",
  3: "hit-3",
};

const Styles = styled.div`
.keyboard {
    background-color: #D3D6DA;
}

.row {
    display: grid;
    grid-template-columns: repeat(20, minmax(0, 1fr));
    gap: .25rem;
    margin-top: .25rem;
}

.key {
    grid-column: span 2;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1.35;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);
    border-radius: .25rem;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1.25rem; 
    cursor: pointer;
    font-size: 18px;
}

.enter, .delete {
    grid-column: span 3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    font-size: 12px;

  }

.enter {
    background: linear-gradient(to top right, #38A126, #7FD138);
}

.delete {
    background-color: #052E34;
}

.hit-0 {
    background-color: #F9F9F9;
    color: #323334;
}

.hit-1 {
    background-color: #323334;
    color: white;
}

.hit-2 {
    background: linear-gradient(to top right, #FFC604, #FF9828);
    color: white;
}

.hit-3 {
    background: linear-gradient(to top right, #38A126, #7FD138);
    color: white;
}
`;

return (
  <Styles>
    <Keyboard />
  </Styles>
);
