const [text, setText] = useState(null);

return (
  <div className="row">
    <div className="col">
      <textarea onChange={(e) => console.log(e)} />
    </div>
    <div className="col">{text}</div>
  </div>
);
