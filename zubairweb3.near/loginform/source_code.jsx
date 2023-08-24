const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 20px auto;
    
`;

const FormHeader = styled.h3`
text-align: center;
font-weight: bold;
color: #0d6efd;
font-family: arial, sans-serif;
font-size: 1.5rem;
`;

return (
  <div>
    <FormHeader>Login Form</FormHeader>
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
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
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
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </Form>
  </div>
);
