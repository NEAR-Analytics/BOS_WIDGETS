const Wrapper = styled.div`
background-image: linear-gradient(to right, #c79081, #dfa579);
width: 80%;
padding: 20px;
border-radius: 20px;
margin: auto;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 20px auto;
    color: #5d4157;
    
`;

const FormHeader = styled.h3`
text-align: center;
font-weight: 800;
color: #5d4157;
font-family: arial, sans-serif;
font-size: 1.5rem;
`;

return (
  <Wrapper>
    <FormHeader>Register Form</FormHeader>
    <Form>
      <div class="mb-3">
        <label for="surname" class="form-label">
          Surname
        </label>
        <input type="text" class="form-control" id="surname" required />
      </div>
      <div class="mb-3">
        <label for="firstname" class="form-label">
          Firstname
        </label>
        <input type="text" class="form-control" id="firstname" required />
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
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">
          Phone Number
        </label>
        <input type="text" class="form-control" id="phone" required />
      </div>

      <div class="mb-3">
        <select class="form-select">
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
        <select class="form-select">
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
        <input type="password" class="form-control" id="password" required />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="check" />
        <label class="form-check-label" for="check">
          Remember me
        </label>
      </div>
      <button
        type="submit"
        style={{ backgroundColor: "#5d4157", color: "#fff" }}
        class="btn"
      >
        Submit
      </button>
    </Form>
  </Wrapper>
);
