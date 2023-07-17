State.init({ greeting: "", username: "", img: null });

const onChange = ({ target }) => {
  State.update({ username: target.value });
};

const onBtnClick = () => {
  if (!state.username) {
    //return;
    console.log(target.value);
  }
};
return (
  <>
    <div class="container border border-info p-3 min-vw-100">
      <p>
        <b> Hola, por favor ingresa tus datos: </b> {state.greeting}{" "}
      </p>

      <table>
        <tr>
          <th>Usuario</th>
          <th>
            <input onChange={onChange} />
          </th>
        </tr>
        <tr>
          <th>Contraseña</th>
          <th>
            <input onChange={onChange} />
          </th>
        </tr>
        <tr>
          <div className="container row">
            <div>
              <IpfsImageUpload image={state.img} />
            </div>
            <div>
              Raw State:
              <pre>{JSON.stringify(state)}</pre>
            </div>
            <div className="mt-2">
              {state.img.cid && (
                <img
                  src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
                  alt="uploaded"
                />
              )}
            </div>
          </div>
        </tr>

        {/*messages.map((data, key) => {
            return (
              <>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </>
            );
          })*/}
      </table>
    </div>
  </>
);
