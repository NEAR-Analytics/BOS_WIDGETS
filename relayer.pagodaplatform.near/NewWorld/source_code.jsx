const [action, setAction] = useState(true);

const changeIs = () => {
  setAction(!action);
};

return (
  <>
    <button onClick={() => changeIs()}> เปลี่ยน </button>

    {action && (
      <Widget
        src="a3r0nz.near/widget/Omagotji-ActionAnimation"
        props={{ action: "feed" }}
      />
    )}
    {!action && (
      <Widget
        src="a3r0nz.near/widget/Omagotji-ActionAnimation"
        props={{ action: "play" }}
      />
    )}
  </>
);
