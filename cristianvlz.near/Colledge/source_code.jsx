/* NEAR BLOCKCHAIN */
const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

console.log("**result_call**", Storage.privateGet("result_call"));
console.log("ultimo mensaje: ", greeting);
let last_jwt = Storage.privateGet("jwt");
console.log("Ultimo jwt almacenado", last_jwt);
if (last_jwt != undefined) {
  let last_mensaje_jwt = greeting.replace(
    "https://certificates.blckchn.xyz/certificado?jwt=",
    ""
  );
  console.log("gree_format", last_mensaje_jwt);
  if (last_mensaje_jwt == last_jwt) {
    console.log("si es igual");
    State.update({
      new_certificado:
        "https://certificates.blckchn.xyz/certificado?jwt=" + last_mensaje_jwt,
    });
  } else {
    console.log("no es igual");
    State.update({ new_certificado: "" });
  }
} else {
  console.log("no hay en storage igual");
  State.update({ new_certificado: "" });
}

// Use and manipulate state
State.init({ new_greeting2: greeting });
State.init({ new_greeting_text: "" });

State.init({ new_greeting: "" });
State.init({ new_certificado: "" });
State.init({ strUrl: "url..." });
State.init({ strEmail: "" });
State.init({ strNombreAlumno: "" });
State.init({ strNombreCurso: "" });
State.init({ strFecha: "" });

const onBtnClick = () => {
  State.update({
    new_greeting_text: "Buscando...",
  });
  return asyncFetch("https://certificates.blckchn.xyz/verify/credential", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jwt: state.strUrl,
    }),
  }).then((responseGql) => {
    if (responseGql.body.verification) {
      State.update({
        new_greeting:
          "https://certificates.blckchn.xyz/certificado?jwt=" + state.strUrl,
      });
      State.update({
        new_greeting_text: "Descargar",
      });
    }
  });
};

const onBtnClickGenerate = () => {
  console.log(
    state.strEmail,
    state.strNombreAlumno,
    state.strNombreCurso,
    state.sender
  );

  return asyncFetch("https://certificates.blckchn.xyz/create/credential", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: state.strEmail,
      nombre: state.strNombreAlumno,
      curso: state.strNombreCurso,
      //wallet: state.sender,
      wallet: context.accountId,
    }),
  }).then((jwt) => {
    Storage.privateSet("jwt", jwt.body.jwt);
    Near.call(contract, "set_greeting", {
      greeting:
        "https://certificates.blckchn.xyz/certificado?jwt=" + jwt.body.jwt,
    }).then((result) => {
      Storage.privateSet("result_call", result);
    });
  });
};

/* END NEAR BLOCKCHAIN */

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

if (!state.sender) return "Por favor inicie sesión";

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}

    .customSubHeader {
      text-align: center;
      padding: 4px;
    }

    .img-fluid  {
      width: 30%    
    }

    .CentrarContenido {
      text-align: center;
      padding: 20px;
  }

  button.LidoStakeFormSubmitContainer {
    background-color: black!important;
  }

  a.LidoStakeFormSubmitContainer {
    background-color: black!important;
    width: 100% !important;
    margin-top;10px !important;
  }

  .LidoForm {
    background: #3c3c3b; 
    }

  .inputsClass {
    border-right: 1px solid rgba(0, 10, 61, 0.12);
    text-align: center;
    text-align-last: center;
     }

      .inputsCenter {
    text-align: center;
    text-align-last: center;
     }

     .wrap-text{
       overflow-wrap: break-word;
     }

     .colledge-link{
       color:blue
     }
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return (
    <Theme>
      <div class="LidoContainer">
        <div class="CentrarContenido">
          <img
            class="img-fluid"
            src={
              "https://www.colledge.social/pluginfile.php/1/theme_edumy/footerlogo1/1681760484/LogoFondoOscuro.svg"
            }
          />
        </div>
        <div class="Header">Cambiar a red Ethereum Mainnet</div>
        <div class="SubHeader"></div>
      </div>
    </Theme>
  );
}

return (
  <Theme>
    <div class="LidoContainer">
      <div class="CentrarContenido">
        <img
          class="img-fluid"
          src={
            "https://www.colledge.social/pluginfile.php/1/theme_edumy/footerlogo1/1681760484/LogoFondoOscuro.svg"
          }
        />
      </div>
      <div class="Header">Generar certificados</div>
      <div class="SubHeader"></div>

      <div
        class="LidoForm"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/somos-colledge/website-colledge/32782c96838fe7ed0f2bc7ecf27ae2630de9f013/Ilustracion_Instruct.svg")`,
          backgroundSize: "300px 100px",
          backgroundPosition: "140% 42%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="LidoFormTopContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Usuario</span>
                <div class="LidoFormTopContainerLeftContent1Circle" />
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <div class="LidoFormTopContainerLeftContent1">
                <div class="LidoFormTopContainerLeftContent1Text">
                  <span>
                    {state.sender.substring(0, 6)}...
                    {state.sender.substring(
                      state.sender.length - 4,
                      state.sender.length
                    )}{" "}
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="LidoSplitter" />
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan2 inputsClass">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEmail}
              onChange={(e) => State.update({ strEmail: e.target.value })}
              placeholder="Email"
            />
          </span>
          <span class="LidoStakeFormInputContainerSpan2 inputsCenter">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              type="date"
              value={state.strFecha}
              onChange={(e) => State.update({ strFecha: e.target.value })}
              placeholder="Fecha"
            />
          </span>
        </div>

        <div
          class="LidoStakeForm"
          style={{
            padding: "32px 0px 0px 0px",
          }}
        >
          <div class="LidoStakeFormInputContainer">
            <span class="LidoStakeFormInputContainerSpan2 inputsClass">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strNombreCurso}
                onChange={(e) =>
                  State.update({ strNombreCurso: e.target.value })
                }
                placeholder="Nombre de curso"
              />
            </span>
            <span class="LidoStakeFormInputContainerSpan2 inputsCenter">
              <input
                class="LidoStakeFormInputContainerSpan2Input"
                value={state.strNombreAlumno}
                onChange={(e) =>
                  State.update({ strNombreAlumno: e.target.value })
                }
                placeholder="Nombre de alumno"
              />
            </span>
          </div>
        </div>

        <div class="LidoFooterContainer">
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Correo: </div>
            <div class="LidoFooterRawRight">
              {state.strEmail ?? "correo"}{" "}
            </div>{" "}
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Fecha del certificado:</div>
            <div class="LidoFooterRawRight">{state.strFecha ?? "fecha"} </div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Nombre del curso:</div>
            <div class="LidoFooterRawRight">
              {state.strNombreCurso ?? "nombreCurso"}{" "}
            </div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Nombre del alumno:</div>
            <div class="LidoFooterRawRight">
              {state.strNombreAlumno ?? "nombreAlumno"}{" "}
            </div>
          </div>
        </div>
        <button
          class="LidoStakeFormSubmitContainer"
          onClick={onBtnClickGenerate}
        >
          <span>Solicitar certificado</span>{" "}
        </button>
        <br />
        <br />
        {state.new_certificado != "" && (
          <a href={state.new_certificado} target="_blank" class="colledge-link">
            <button class="LidoStakeFormSubmitContainer">
              <span>Descargar</span>{" "}
            </button>
          </a>
        )}
      </div>
    </div>

    <div class="LidoContainer" style={{ marginTop: 70 }}>
      <div
        class="LidoForm"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/somos-colledge/website-colledge/c357a6b67a8bef546399d72ef6a3b430d2075ff2/Academia.svg")`,
          backgroundSize: "300px 100px",
          backgroundPosition: "127% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="LidoFormTopContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Usuario</span>
                <div class="LidoFormTopContainerLeftContent1Circle" />
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <div class="LidoFormTopContainerLeftContent1">
                <div class="LidoFormTopContainerLeftContent1Text">
                  <span>
                    {state.sender.substring(0, 6)}...
                    {state.sender.substring(
                      state.sender.length - 4,
                      state.sender.length
                    )}{" "}
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div class="LidoSplitter" />
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strUrl}
              onChange={(e) => State.update({ strUrl: e.target.value })}
              placeholder="Url del certificado"
            />
          </span>
        </div>
        <button class="LidoStakeFormSubmitContainer mt-4" onClick={onBtnClick}>
          <span>Validar certificado</span>{" "}
        </button>

        <p class="text-center mt-2">Descargar certificado:</p>
        <p class="text-center text-decoration-underline wrap-text ">
          <a href={state.new_greeting} target="_blank" class="colledge-link">
            {state.new_greeting_text}
          </a>
        </p>
        <p class="text-center mt-2">Ver mis transacciones:</p>
        <p class="text-center text-decoration-underline wrap-text ">
          <a
            href="https://wallet.near.org/"
            target="_blank"
            class="colledge-link"
          >
            NEAR blockchain
          </a>
        </p>
      </div>
    </div>
  </Theme>
);
