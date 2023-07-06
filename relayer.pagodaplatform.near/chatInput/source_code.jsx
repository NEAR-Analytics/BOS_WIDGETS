State.init({ message: "hi" });

let message = "";
let username = props.username || "User";

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;
const onChange = ({ target }) => {
  message = target.value;
};

const onSend = (event) => {
  State.update({ message: message });
};

return (
  <>
    <div class="container border border-info p-3 min-vw-10">
      <p>
        <b> {username}: </b> {state.message}{" "}
      </p>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{ marginRight: "10px" }}
          placeholder="Say something nice..."
          onChange={onChange}
        />
        <Button onClick={onSend}>Send</Button>
      </div>
    </div>
  </>
);
