const [input, setInput] = useState("");
const [input2, setInput2] = useState("");

return (
  <div>
    <div>
      <label className="text-white">Child in another Widget</label>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
    <div>
      <label className="text-white">Child in another Widget</label>
      <input value={input2} onChange={(e) => setInput2(e.target.value)} />
    </div>
    <button onClick={() => setChildInput({ input, input2 })}>Submit</button>
  </div>
);
