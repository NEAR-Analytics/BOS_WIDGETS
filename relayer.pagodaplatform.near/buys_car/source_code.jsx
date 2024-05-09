const { normalize } = VM.require("buildbox./widget/utils.stringUtils") || {
  normalize: (s) => s,
};

const app = props.app || "buildbox";
const type = props.type || "project";

const accountId = context.accountId;

//estilos de los campos y titulo
const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #292320;
  color: #fff;
  gap: 5rem;

  padding: 64px 80px;
`;

const Header = styled.h1`
  color: #fff;
  font-size: 90px;
  max-width: 900px;
  font-style: normal;
  text-align: left;
  font-weight: 500;
  line-height: 108px;
  text-transform: lowercase;

  @media screen and (max-width: 768px) {
    font-size: 36px;
    max-width: 70%;
    line-height: 43px;
  }
`;

const Subheader = styled.p`
  color: rgb(255, 255, 255);
  font-size: 24px;
  max-width: 800px;
  text-align: left;
  line-height: 36px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  font-size: 24px;
`;

const Subtext = styled.p`
  font-size: 12px;
  color: #c0c0c0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #292320;
  color: #fff;
  border: 1px solid #fff;
  outline: none;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  background-color: #292320;
  color: #fff;
  border: 1px solid #fff;
  outline: none;
  border-radius: 0.5rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  margin-right: 15px;
  color: #fff;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const ConsentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ConsentCheckbox = styled.input`
  margin-right: 5px;
  margin-top: 5px;
`;

const ConsentLabel = styled.label`
  font-size: 14px;
`;

const SubmitButton = styled.button`
  color: #000;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  box-shadow: 5px 6px 0 0 #000;
  font-style: normal;
  transition: 0.3s;
  font-weight: 500;
  border-color: #000;
  border-width: 1px;
  border-radius: 0;
  padding: 16px 24px;
  background-color: #ffcf77;

  &:hover {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const [nombre, setNombre] = useState("");
const [teammates, setTeammates] = useState("");
const [marca, setMarca] = useState("");
const [modelo, setModelo] = useState("");
const [año, setAño] = useState("");
const [bin, setBin] = useState("");
const [precio, setPrecio] = useState("");
const [fecha, setFecha] = useState("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [isEmailValid, setIsEmailValid] = useState(true);

function isValidEmail(email) {
  return emailRegex.test(email);
}

useEffect(() => {
  setIsEmailValid(isValidEmail(contactInfo));
  if (contactInfo === "") {
    setIsEmailValid(true);
  }
}, [contactInfo]);

const handleSubmit = () => {
  const id = normalize(nombre);
  const path = `${context.accountId}/${app}/${type}/${id}`;
  const postItem = { type: "social", path: `${context.accountId}/post/main` };

  Social.set(
    {
      post: {
        main: JSON.stringify({
          text: `I've just submitted a ${type} to Abstraction Hacks! #build #${type} #abstraction #hack \n\n[EMBED](${path})\n\n # ${nombre}\n\n${marca}\n\n### Teammates\n${teammates}\n\n### Tracks\n${modelo.join(
            "\n"
          )}\n\n ### Project Link\n${año}\n\n### Demo\n${bin}\n\n### What I learned\n\n${precio}\n\n### Referral\n\n${fecha}`,
          image: "",
          type: "",
        }),
      },
      index: {
        post: JSON.stringify({ key: "main", value: { type: "md" } }),
        hashtag: JSON.stringify([
          {
            key: "abstraction",
            value: postItem,
          },
          { key: "hack", value: postItem },
          { key: "build", value: postItem },
          { key: "project", value: postItem },
        ]),
      },
      buildbox: {
        [type]: {
          [id]: {
            "": JSON.stringify({
              nombre,
              teammates,
              marca,
              modelo,
              año,
              bin,
              precio,
              fecha,
            }),
            metadata: {
              name: nombre,
              teammates,
              marca,
              modelo,
              bin,
              type: `buildbox.near/type/${type}`, // for later
              tags,
            },
          },
          hackathon: {
            abstractionhacks: {
              submissions: {
                [`${context.accountId}-${normalize(nombre)}`]: "",
              },
            },
          },
        },
      },
    },
    {
      force: true,
      onCommit: (v) => console.log("onCommit", v),
      onCancel: (v) => console.log("onCancel", v),
    }
  );
};

const pageDescription = ``;

return (
  <Root>
    <HeaderContainer>
      <Header>📦 Block Car</Header>
      <Subheader>
        <Markdown text={pageDescription} />
      </Subheader>
    </HeaderContainer>
    <FormContainer>
      <FormGroup>
        <Label htmlFor="nombre">
          Nombre<span className="text-danger">*</span>
        </Label>
        <Subtext>
          Ingresa el nombre de la persona que comprara el Automovil
        </Subtext>
        <Input
          name="nombre"
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="teammates">
          Correo Electronico <span className="text-danger">*</span>
        </Label>
        <Subtext>El correo debe contar con un @</Subtext>
        <Input
          name="teammates"
          id="teammates"
          type="text"
          value={teammates}
          onChange={(e) => setTeammates(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="marca">
          Marca
          <span className="text-danger">*</span>
        </Label>
        <Subtext> Ingresa el marca correspondiente al vehiculo</Subtext>
        <Input
          name="marca"
          id="marca"
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="modelo">
          Modelo<span className="text-danger">*</span>
        </Label>
        <Subtext>Ingresa el modelo correspondiente al vehiculo</Subtext>
        <Input
          id="modelo"
          name="modelo"
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="año">
          Año<span className="text-danger">*</span>
        </Label>
        <Subtext>Ingresa el año correspondiente al vehiculo</Subtext>
        <Textarea
          name="año"
          id="año"
          value={año}
          onChange={(e) => setAño(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="bin">
          Bin<span className="text-danger">*</span>
        </Label>
        <Subtext>Ingresa el modelo correspondiente al vehiculo </Subtext>
        <Textarea
          name="bin"
          id="bin"
          value={learning}
          onChange={(e) => setBin(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="precio">
          Precio
          <span className="text-danger">*</span>
        </Label>
        <Subtext>Ingresa el bin correspondiente al vehiculo</Subtext>
        <Input
          name="precio"
          id="precio"
          type="text"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="fecha">
          Fecha<span className="text-danger">*</span>
        </Label>
        <Subtext>Ingresa la fecha de la compra del vehiculo</Subtext>
        <Textarea
          name="fecha"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </FormGroup>

      <SubmitButton
        onClick={handleSubmit}
        disabled={
          !nombre ||
          !teammates ||
          !marca ||
          !modelo ||
          !año ||
          !bin ||
          !precio ||
          !fecha ||
          !isEmailValid
        }
      >
        Submit
      </SubmitButton>
    </FormContainer>
  </Root>
);
