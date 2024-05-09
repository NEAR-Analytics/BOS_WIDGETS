//sample fork
const Card = styled.div`
.card-div {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
  position: relative;
  align-items: left;
  min-height: auto;
}

.card-div:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #555;
}

.big-name {
  font-size: 36px;
  margin-bottom: 10px;
}

.time {
  font-size: 14px;
}

.description {
  font-size: 16px;
  margin-top: 10px;
}

.details {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
}

.lock-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
`;

function shortText(text) {
  const words = text.split(" ");
  return words.slice(0, 15).join(" ") + "...";
}

return (
  <Card>
    <div className="card-div" style={props.style}>
      <div className="big-name">{props.name}</div>
      <div className="description">{shortText(props.desc)}</div>
      <div className="details">
        <div className="time">Open on: {props.open}</div>
        <div className="time">Close on: {props.close}</div>
        <div className="time">No of Candidates: {props.no_of_candidates}</div>
      </div>
      <div className="lock-icon">🔒</div>
    </div>
  </Card>
);
