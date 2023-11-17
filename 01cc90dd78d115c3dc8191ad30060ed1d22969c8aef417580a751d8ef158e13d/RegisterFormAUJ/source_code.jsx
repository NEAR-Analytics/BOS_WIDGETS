//Iniciamos el componente
State.init({ commitLoading: false });

State.init({
  surname: "",
  firstname: "",
  email: "",
  phone: "",
  occupation: "",
  password: "",
});

const data = {
  formData: {
    surname: state.surname,
    firstname: state.firstname,
    email: state.email,
    phone: state.phone,
    occupation: state.occupation,
    password: state.password,
  },
};

const accountId = "Lau22.near";
const getData = Social.get(`${accountId}/formData/**`);

console.log(getData);

const getUserRegisterFormAUJ = (user) => {
  asyncFetch(`https://api.mav.xyz/api/v3/user/${state.sender}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      State.update({ getUserRegisterFormAUJ: res.body.user });
    });
};

const Wrapper = styled.div`
background-image: linear-gradient(to right, #11b3e8, #8b8ec3);
width: 80%;
padding: 20px;
margin: 10px auto;
border-radius: 15px;
@media (max-width: 650px){
  width: 100%;
}
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 20px auto;
    color: #ffffff;
    @media (max-width: 650px){
  width: 90%;
}
`;

const FormHeader = styled.h3`
text-align: center;
font-weight: 800;
color: #ffffff;
font-family: arial, sans-serif;
font-size: 1.5rem;
`;

const CommitButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1.5em;
  gap: 0.5em;
  background: #898fc8;
  border-radius: 150px;
  border: none;
  color: #ffffff; 

  &:hover,
  &:focus,
  &:active {
    background: #6b75a6; 
    text-decoration: none;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

let current_user = context.accountId;
if (!current_user) {
  return (
    <div style={{ textAlign: "center" }}>
      <a href="https://near.org/near/widget/ProfilePage?accountId=01cc90dd78d115c3dc8191ad30060ed1d22969c8aef417580a751d8ef158e13d">
        <button>Connect with NEAR account</button>
      </a>
    </div>
  );
}
return (
  <Wrapper>
    <FormHeader>Registro AdoptaUnJunior</FormHeader>
    <Form>
      <div class="mb-3">
        <label for="Nombre" class="form-label">
          Nombre
        </label>
        <input
          type="text"
          class="form-control"
          id="surname"
          required
          value={state.surname || ""}
          onChange={(e) => State.update({ surname: e.target.value })}
        />
      </div>
      <div class="mb-3">
        <label for="Apellidos" class="form-label">
          Apellidos
        </label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          required
          onChange={(e) => State.update({ firstname: e.target.value })}
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          required
          onChange={(e) => State.update({ email: e.target.value })}
        />
        <div id="emailHelp" class="form-text">
          Nunca compartiremos su correo electrónico con nadie más.
        </div>
      </div>
      <div class="mb-3">
        <label for="Teléfono" class="form-label">
          Teléfono
        </label>
        <input
          type="text"
          class="form-control"
          id="phone"
          required
          onChange={(e) => State.update({ phone: e.target.value })}
        />
      </div>
      <div class="mb-3">
        <label for="occupation" class="form-label">
          Formación
        </label>
        <select
          class="form-select"
          onChange={(e) => State.update({ occupation: e.target.value })}
        >
          <option value="near-developer" name="occupation">
            FullStack Developer
          </option>
          <option value="near-developer" name="occupation">
            Front End Developer
          </option>
          <option value="near-developer" name="occupation">
            Backc End Developer
          </option>
          <option value="near-developer" name="occupation">
            Software Developer
          </option>
          <option value="near-developer" name="occupation">
            Blockchain Developer
          </option>
          <option value="content-creation" name="occupation">
            UX/UI Developer
          </option>
          <option value="crypto-trader" name="occupation">
            Otras...
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          onChange={(e) => State.update({ password: e.target.value })}
        />
      </div>

      <CommitButton class="styled.a" data={data}>
        Enviar
      </CommitButton>
    </Form>
  </Wrapper>
);
