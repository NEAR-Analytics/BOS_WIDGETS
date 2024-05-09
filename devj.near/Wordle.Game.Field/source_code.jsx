const Field = () => (
  <div className="field px-4 pt-2 pb-3 shadow rounded">
    {props.formattedGuesses.map((g, i) => (
      <Row key={i} guess={g} />
    ))}
  </div>
);

const Row = ({ guess }) => (
  <div className="row">
    {guess.map((l, i) => (
      <Cell key={i} data={l} />
    ))}
  </div>
);

const Cell = ({ data }) => (
  <div className={`cell ${hitStyle[data.hit]}`}>{data.key}</div>
);

const hitStyle = {
  0: "hit-0",
  1: "hit-1",
  2: "hit-2",
  3: "hit-3",
};

const Styles = styled.div`
.field {
    background-color: #D3D6DA;
}

.row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.cell {
    aspect-ratio: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.875rem;
    text-transform: uppercase;
    font-weight: bold;
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
    <Field />
  </Styles>
);
