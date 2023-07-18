return (
  <>
    <input
      placeholder={props.placeHolder}
      value={state.value}
      onChange={handleChange}
    />
    <button>Search</button>
  </>
);
