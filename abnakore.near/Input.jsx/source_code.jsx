const Wrapper = styled.div`
label {
  position: relative;
}
label .input {
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 20px 5px 5px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  font-size: medium;
}

.input + span {
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  left: 10px;
  top: 0px;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.input:placeholder-shown + span {
  top: 12.5px;
  font-size: 0.9em;
}
`;
const itemIndex = props.item;

function updateText(e) {
  props.setItem({
    ...props.items,
    itemIndex: e.target.value,
  });
}

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <label>
          <input
            className="input"
            type={props.type}
            placeholder=""
            required={props.required}
          />
          <span>{props.placeholder}</span>
        </label>
      ),
    }}
  />
);
