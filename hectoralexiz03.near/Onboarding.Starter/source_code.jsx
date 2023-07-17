const user = "gagdiez.near";
State.init({ nombres: [] });
State.update({ nombres: props.nombres });
console.log(props.nombres);
const props = {
  name: "What programming language would you like to learn so far?",
};
State.init({
  img: null,
});
const Programacion = [
  {
    nombre: "PYTHON",
  },
  {
    nombre: "C++",
  },
  {
    nombre: "ENSAMBLADOR X86",
  },
  {
    nombre: "JAVA",
  },
];

return (
  <>
    <div class="container min-vw-100">
      <div className="d-flex justify-content-center">
        <h3>PROGRAMMING WORLD</h3>
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex p-2">
          {Programacion.map((data) => {
            return <p className="mx-4"> {data.nombre} </p>;
          })}
        </div>
      </div>
      <p className="d-flex justify-content-center">
        Learn new programming languages to improve your developing skills to
        reach a higher sucess in your professional life.
      </p>
      <hr />
      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>

    <div className="d-grid gap-2 mt-4">
      <button class="btn btn-primary" type="button">
        JUNIOR DEVELOPER
      </button>
      <button class="btn btn-primary" type="button">
        SENIOR DEVELOPER
      </button>
    </div>
    <div className="container row ">
      <div>
        Image upload: <br />
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
  </>
);
