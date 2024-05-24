const [dato, setDato] = useState("");
return (
  <>
    <VaraNetwork.Wrapper>
      <VaraNetwork.Account />
      <VaraNetwork.Interaction
        trigger={({ testSignTransaction }) => (
          <>
            <button
              onClick={() => {
                testSignTransaction();
              }}
            >
              Prueba firma de transaccion
            </button>
          </>
        )}
      />
      <VaraNetwork.Interaction
        trigger={({ testReadState }) => (
          <>
            <button
              onClick={() => {
                const info = testReadState();
                info.then((res) => {
                  console.log("ReadState", res);
                  setDato(res);
                });
              }}
            >
              Prueba lectura de estado
            </button>
          </>
        )}
      />
      <button onClick={() => console.log("almacenado", dato)}>
        Prueba del estado
      </button>
    </VaraNetwork.Wrapper>
  </>
);
