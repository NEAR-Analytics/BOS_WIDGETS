const [text, setText] = useState(null);

return (
  <div className="row">
    <div className="col">
      <textarea onChange={(e) => setText(e.target.value)} />
    </div>
    <div className="col">{text}</div>
  </div>
);
