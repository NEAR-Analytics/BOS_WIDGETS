return (
  <SuiSigner
    provides={(props) => (
      <div>
        <p>{JSON.stringify(props)}</p>
      </div>
    )}
  />
);
