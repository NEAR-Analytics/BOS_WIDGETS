return (
  <>
    {/* <div className="input-field"> */}
    <label>
      <input
        className="input"
        type={props.type}
        placeholder=""
        required={props.required}
      />
      <span>{props.placeholder}</span>
    </label>
    {/* </div> */}
  </>
);
