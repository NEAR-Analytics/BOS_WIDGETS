return (
  <SuiClientQuery
    provides={(props) => (
      <div>
        <p>{JSON.stringify(props)}</p>
      </div>
    )}
    query={{
      method: "getOwnedObjects",
      params: { owner: "0x123" },
      options: { gcTime: 10000 },
    }}
  />
);
