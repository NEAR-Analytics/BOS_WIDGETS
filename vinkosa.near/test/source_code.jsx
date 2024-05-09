const [text, setText] = useState("hei123");
const [t2, setT2] = useState("hade123");
return (
  <>
    noe tekst {text}
    <input
      value={text}
      onChange={(event) => setText(event.target.value)}
    ></input>
    <p>enda mer tekst {t2} </p>
    <input value={t2} onChange={(event) => setT2(event.target.value)}></input>
  </>
);
