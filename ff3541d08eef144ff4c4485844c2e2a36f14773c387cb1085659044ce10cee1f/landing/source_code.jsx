const tipMeContract = "0x57E094946e737694fCdADfdF2f2FfbfC8c6F99e4";

const tipMetAbi = fetch(
  "https://raw.githubusercontent.com/Noisk8/Componente-BOS/main/Forwarder_abi.txt"
);

const donationAmount = ethers.utils.parseEther("0.000282233502538071");

let donators = [];
let qty = 0;
State.init({
  qty,
  donators,
  name: "",
  message: "",
});

const tipMe = () => {
  const contract = new ethers.Contract(
    tipMeContract,
    tipMetAbi.body,
    Ethers.provider().getSigner()
  );
  contract
    .donateCoffee(
      "El articulo",
      "0x087f9545Dad969C6b806C40E08E7D45c72D0C676",
      state.name,
      state.message,
      5,
      {
        value: donationAmount,
      }
    )
    .then((res) => console.log(res));
};

const tipsQty = () => {
  const contract = new ethers.Contract(
    tipMeContract,
    tipMetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.getCoffeeQTY().then((res) => {
    let qtyDonations = parseInt(res, 16);
    State.update({ qty: qtyDonations });
  });
  console.log(state.name);
};

const getDonators = () => {
  const contract = new ethers.Contract(
    tipMeContract,
    tipMetAbi.body,
    Ethers.provider().getSigner()
  );

  contract.getCoffeeLog().then((info) => {
    donators = [];
    info.map((data) => {
      if (data[1] != "") {
        let date = parseInt(data[0], 16);

        const myDate = new Date(date * 1000);
        donators.push({
          date: myDate.toLocaleString(),
          title: data[1],
          name: data[3],
          message: data[4],
          rating: data[5],
        });
      }
    });
    State.update({ donators: donators });
  });
};

const giveme = () => {};
const Button0018 = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.4rem 3rem;
  margin: 20px ;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  border-radius: 5px;
  overflow: hidden;
  background: #1974D2;
  color: ghostwhite;

  span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
  }

  &:hover span {
    color: black;
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }`;
const text = props.text || "Button0018";
const fontsize = props.fontsize;
const fontweight = props.fontweight;

return (
  <>
    <div className="bg-light-subtle">
      <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse btn-group "
            role="group"
            id="navbarSupportedContent"
            aria-label="Basic outlined example"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <button type="button" class="btn btn-outline-primary">
                    Acerca De
                  </button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <button type="button" class="btn btn-outline-primary">
                    Docomentación
                  </button>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <button type="button" class="btn btn-outline-primary">
                    Github
                  </button>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      <button type="button" class="btn btn-outline-primary">
                        Middle
                      </button>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <button type="button" class="btn btn-outline-primary">
                        Left
                      </button>
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      <button type="button" class="btn btn-outline-primary">
                        Middle
                      </button>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="d-flex">
              <Web3Connect
                className="ConnectButton "
                connectLabel="Conetar Billetera"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mt-5">
        <div className="d-flex flex-column align-items-center mb-3">
          <h1> Tipe Me </h1>
          <img
            src="https://raw.githubusercontent.com/Noisk8/Componente-BOS/main/img/tipeme.png"
            alt="Gif"
            width="200px"
            className="mb-4"
          />

          <div className="d-flex justify-content-center align-items-center flex-column bg-light p-3 shadow-lg rounded mb-4">
            <div className="form-group">
              <input
                className="form-control mt-2"
                type="text"
                id="name"
                name="name"
                required
                minLength="4"
                maxLength="8"
                size="10"
                placeholder="Nombre del Donante"
              />
            </div>

            <div className="form-group mb-4">
              <textarea
                class="form-control mt-4"
                placeholder="Sugerencias"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div class="mb-2">
              <Widget
                src={"marketplacebos.near/widget/Radio.RadioP.Radio0001"}
              />
            </div>
            <Button0018
              fontsize={fontsize}
              fontweight={fontweight}
              onClick={tipMe}
            >
              <span>Tipe Me </span>
            </Button0018>
          </div>

          <h1 className="mt-4 mb-4 text-center"> Ultimas Donaciones</h1>
          <button onClick={tipsQty}>cantidad donaciones</button>
           <h2 className="text-info">cantidad tips: {state.qty}</h2>
           <div class="mb-4"> 
    <button onClick={getDonators}>ultimos donantes</button></div>
          <table className="table table-bordered table-hover table-responsive bg-light p-3 shadow-lg rounded">
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
        </div>
        <div class="card-footer bg-transparent border-success mb-4 ">
          Tipe Me 2023
        </div>
      </div>
    </div>
  </>
);
