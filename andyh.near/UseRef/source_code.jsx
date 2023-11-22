const [text, setText] = useState(null);
const textRef = useRef(null);

useEffect(() => {
  textRef.current.focus();
}, []);

return (
  <div className="row">
    <div className="col">
      <textarea ref={textRef} onChange={(e) => setText(e.target.value)} />
    </div>
    <div className="col">
      <button onClick={() => textRef.current.focus()}>focus</button>
    </div>
    <div className="col">{text}</div>
  </div>
);
