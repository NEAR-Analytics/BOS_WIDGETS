return (
  <SuiClientQuery
    provides={(props) => (
      <div>
        <p>{JSON.stringify(props)}</p>
      </div>
    )}
    query={{
      method: "getOwnedObjects",
      params: {
        owner:
          "0x9c0d669def370737c9c186d533a1ed4177983febf61ab14d75cec79114e84d2c",
      },
      options: { gcTime: 10000 },
    }}
  />
);
