const disabledInput = props.disabled || false;
const inputError = props.inputError || false;
const placeholder = props.placeholder;
const value = props.value;
const onChange = props.onChange;
const onClickMax = props.onClickMax;
const usdPrice = props.usdPrice;

const Wrapper = styled.div`
    display: block;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: 3px solid rgb(12, 34, 70);
    
    button {
      border-radius: 1000px;
      height: 34px;
      padding: 8px 16px;
      border: 2px solid rgb(12, 34, 70);
      line-height: 1.2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: black;
      :hover {
        background: transparent;
        border: 2px solid rgb(12, 34, 70);   
        line-height: 1.2;
        color: black;
      }
    }

    input {
      text-align: end;
      outline: none;
      border: none;
      font-size: 40px;
      padding: 0;
      margin: -5px 0;
      line-height: 0px;

      /* Removes the arrows in number inputs in most browsers */
      ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Removes the arrows in Firefox */
      appearance: none;

      /* Removes the highlight around the input on some browsers when active */
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  `;

const Highlight = styled.div`
    font-weight: bold;
  `;

return (
  <Wrapper>
    <Highlight>{placeholder}</Highlight>
    <input
      disabled={disabledInput}
      type="number"
      placeholder="0"
      value={value}
      onChange={onChange}
      style={{ color: inputError ? "red" : "inherit" }}
    />
    <button onClick={() => onClickMax()}>Max</button>
    <div style={{ textAlign: "end", color: inputError ? "red" : "inherit" }}>
      USD {usdPrice || 0}
    </div>
  </Wrapper>
);
