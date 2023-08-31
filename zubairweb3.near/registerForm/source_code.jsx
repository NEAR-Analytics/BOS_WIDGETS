State.init({ commitLoading: false });

State.init({
  surname: "",
  firstname: "",
  email: "",
  phone: "",
  gender: "",
  occupation: "",
  password: "",
});

const data = {
  formData: {
    surname: state.surname,
    firstname: state.firstname,
    email: state.email,
    phone: state.phone,
    gender: state.gender,
    occupation: state.occupation,
    password: state.password,
  },
};

// const accountId = "zubairweb3.near";
// const getData = Social.get(`${accountId}/formData/**`);

console.log(getData);

const Wrapper = styled.div`
background-image: linear-gradient(to right, #c79081, #dfa579);
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
    color: #5d4157;
    @media (max-width: 650px){
  width: 90%;
}
`;

const FormHeader = styled.h3`
text-align: center;
font-weight: 800;
color: #5d4157;
font-family: arial, sans-serif;
font-size: 1.5rem;
`;

// let current_user = context.accountId;
// if (!current_user) {
//   return (
//     <div>
//       <a href="https://near.org/signin">
//         <button>Connect with NEAR account</button>
//       </a>
//     </div>
//   );
// }
return (
  <Wrapper>
    <FormHeader>Register</FormHeader>
    <Form>
      <div class="mb-3">
        <label for="surname" class="form-label">
          Surname
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
        <label for="firstname" class="form-label">
          Firstname
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
          Email address
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
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">
          Phone Number
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
        <select
          class="form-select"
          onChange={(e) => State.update({ gender: e.target.value })}
        >
          <option selected>Gender</option>
          <option value="male" name="gender">
            Male
          </option>
          <option value="female" name="gender">
            Female
          </option>
        </select>
      </div>
      <div class="mb-3">
        <select
          class="form-select"
          onChange={(e) => State.update({ occupation: e.target.value })}
        >
          <option selected>Occupation</option>
          <option value="near-developer" name="occupation">
            NEAR Developer
          </option>
          <option value="content-creation" name="occupation">
            Content Creation
          </option>
          <option value="crypto-trader" name="occupation">
            Cryppto Trader
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
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="check" />
        <label class="form-check-label" for="check">
          Remember me
        </label>
      </div>
      <CommitButton style={{ backgroundColor: "#5d4157" }} force data={data}>
        Submit
      </CommitButton>
    </Form>
  </Wrapper>
);
