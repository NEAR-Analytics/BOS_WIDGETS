return (
  <>
    <h1 className="mt-4 mb-4 text-center"> Ultimas Donaciones</h1>
    <table className="table table-bordered table-hover table-responsive">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Fecha</th>
          <th scope="col">Articulo</th>
          <th scope="col">Donante</th>
          <th scope="col">Mensaje</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>New Data 1</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>

          <td>New Data 3</td>
        </tr>
        <tr className="table-info">
          <th scope="row">3</th>
          <td>Larry the Bird</td>
          <td> dato 3</td>
          <td>@twitter</td>
          <td>New Data 5</td>
        </tr>
      </tbody>
    </table>
  </>
);
