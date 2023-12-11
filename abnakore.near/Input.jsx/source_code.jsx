return (
  <>
    {/* <div className="input-field"> */}
    <label>
      <input
        className="input"
        type={props.type}
        placeholder=""
        required={required}
      />
      <span>{placeholder}</span>
    </label>
    {/* </div> */}
  </>
);
