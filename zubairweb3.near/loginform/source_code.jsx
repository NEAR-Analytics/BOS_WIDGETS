const Wrapper = styled.div`
background-image: linear-gradient(to right, #c79081, #dfa579);
width: 80%;
padding: 20px;
margin: auto;
border-radius: 15px;
height: 100vh;
display: flex;
justify-content: center;
flex-direction: column;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 20px auto;
    color: #5d4157;
    
`;

const FormHeader = styled.h3`
text-align: center;
font-weight: bold;
color: #5d4157;
font-family: arial, sans-serif;
font-size: 1.5rem;
`;

return (
  <Wrapper>
    <FormHeader>Login</FormHeader>
    <Form>
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
