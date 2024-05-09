const [text, setText] = useState("hei123");
const [t2, setT2] = useState("hade123");
const [t3, setT3] = useState("anotherValue");

const testdata = Social.get("vinkosa.near/testdata/**");
setText(testdata.text);
setT2(testdata.t2);
setT3(testdata.t3);

const handleSubmit = () => {
  // Handle submission logic here
  console.log("Form submitted!");
  Social.set({ testdata: { text, t2, t3 } });
};

return (
  <>
    <p>Some text: {text}</p>
    <input value={text} onChange={(event) => setText(event.target.value)} />
    <p>Some more text: {t2}</p>
    <input value={t2} onChange={(event) => setT2(event.target.value)} />
    <p>Yet another text: {t3}</p>
    <input value={t3} onChange={(event) => setT3(event.target.value)} />
    <button onClick={handleSubmit}>Submit</button>
  </>
);
