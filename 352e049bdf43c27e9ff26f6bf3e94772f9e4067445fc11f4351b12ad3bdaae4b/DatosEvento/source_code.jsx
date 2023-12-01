const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  min-height: 500px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: ${true ? "column" : "column-reverse"};
  }
`;

const Evento = styled.div`
    text-align: center;
`;

return (
  <ItemContainer>
    <>
      {props.mostrar ? (
        <Evento>
          <h3>{props.name}</h3>

          <img
            style={{
              maxHeight: 100,
              width: "50%",
              objectFit: "cover",
            }}
            src={props.image}
            alt="art"
          />
          <p class="text-center py-2">
            Lugar: {props.lugar} <br></br>
            Fecha: {props.fecha} <br></br>
            Hora: {props.hora} <br></br>
            <br></br>
            {props.mensaje}
          </p>
          <br />
        </Evento>
      ) : (
        <>
          <Evento>
            <h3>Selecciona un evento</h3>
          </Evento>
        </>
      )}
    </>
  </ItemContainer>
);
