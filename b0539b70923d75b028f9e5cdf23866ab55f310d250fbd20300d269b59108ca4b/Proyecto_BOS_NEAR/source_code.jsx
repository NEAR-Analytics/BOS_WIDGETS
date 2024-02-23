// Inicializa el estado con una propiedad 'img' establecida en null
State.init({ img: null });

// Realiza una solicitud asíncrona a la API de la NASA usando asyncFetch
asyncFetch(
  "https://api.nasa.gov/planetary/apod?api_key=Q5V20Ks6o1lTOgteq8dpWAHBsCKgCG4x7tNwVdNI"
)
  .then(({ body }) => {
    // Actualiza el estado con la URL de la imagen obtenida de la respuesta de la API
    State.update({ img: body.url });
  })
  .catch((err) => console.log("Error fetching data:", err));

// Utiliza styled-components para aplicar estilos al componente Wrapper
const Wrapper = styled.div`
  .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #000000;
  }
`;

// Devuelve el JSX del componente con la estructura de la interfaz de usuario
return (
  <Wrapper>
    {/* Navbar con pestañas de navegación */}
    <div className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      {/* Contenido de la barra de navegación */}
      <span className="navbar-brand">Proyecto Final</span>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* Lista de pestañas de navegación */}
        <ul
          className="navbar-nav nav-pills mr-auto"
          id="pills-tab"
          role="tablist"
        >
          {/* Pestaña "Consulta Widget" */}
          <li className="nav-item" role="presentation">
            <span
              className="nav-link px-3 active"
              id="pills-tab-home"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span className="fw-bold">Consulta Widget</span>
            </span>
          </li>
          {/* Pestaña "Consulta API" */}
          <li className="nav-item" role="presentation">
            <span
              className="nav-link active"
              id="pills-tab-builder"
              data-bs-toggle="pill"
              data-bs-target="#pills-builder"
              type="button"
              role="tab"
              aria-controls="pills-builder"
              aria-selected="true"
              className="nav-link px-3 "
            >
              <label className="custom-control-label" htmlFor="darkSwitch">
                <span className="fw-bold">Consulta API</span>
              </label>
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* Contenedor principal */}
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-12">
          {/* Contenido de las pestañas */}
          <div className="tab-content" id="pills-tabContent">
            {/* Pestaña "Consulta Widget" */}
            <div
              className="tab-pane fade show active"
              id={`pills-home`}
              role="tabpanel"
              aria-labelledby={`pills-tab-home`}
              tabIndex="0"
            >
              {/* Widget con propiedades específicas */}
              <Widget
                src="yairnava.near/widget/Greetings"
                props={{
                  name: "Fernando",
                  lastname: "Trejo",
                }}
              />
            </div>
            {/* Pestaña "Consulta API" */}
            <div
              className="tab-pane fade"
              id={`pills-builder`}
              role="tabpanel"
              aria-labelledby={`pills-tab-builder`}
              tabIndex="0"
            >
              {/* Contenido de la pestaña "Consulta API" */}
              <h1>API de la NASA</h1>
              <p>
                Esta API hace consulta a ciertas rutas de los servidores de la
                NASA, en este caso estamos haciendo referencia a la API llamada
                APOD, que consiste en traer la imagen del día publicada por la
                NASA.
              </p>
              <a href="https://apod.nasa.gov/apod/astropix.html">
                <p>Imagen del día</p>
              </a>

              {/* Renderiza la imagen de la NASA si está disponible en el estado */}
              {state.img != null && (
                <div
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    border: "3px solid black",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={state.img}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);
