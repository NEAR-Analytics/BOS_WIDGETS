const Spinner = styled.div`
  margin: 0 auto;
  width: 25px;
  height: 25px;
  border: 4px solid transparent;
  border-top: 4px solid #4d4637;
  border-radius: 100%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

State.init({
  RP: {
    loading: false,
    data: null,
    err: null,
  },
});

function loadRP(address) {
  State.update({
    RP: {
      loading: true,
      data: null,
      err: null,
    },
  });
  setTimeout(
    () =>
      State.update({
        RP: {
          loading: false,
          data: { someData: true },
          err: null,
        },
      }),
    1000
  );
}

return (
  <div
    style={{
      display: "flex",
      flexFlow: "column nowrap",
      gap: "10px",
      backgroundColor: "#fde030",
      padding: "10px",
      borderRadius: "10px",
      maxWidth: "400px",
    }}
  >
    <input placeholder="RP Address" onChange={(e) => loadRP(e.target.value)} />
    {state.RP.data != null && (
      <>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            gap: "10px",
          }}
        >
          <select id="method" style={{ flex: 1 }}>
            <option value="1">get_script</option>
          </select>
          <select id="schema" style={{ flex: 1 }}>
            <option value="1">German Passport</option>
            <option value="2">Portuguese ID</option>
            <option value="3">International Drivers License</option>
          </select>
        </div>
        <input type="file" placeholder="credentials" />
      </>
    )}
    {state.RP.loading && <Spinner />}
  </div>
);
